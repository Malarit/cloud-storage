import asyncHandler from "express-async-handler";

import * as reqTypes from "./type.js";

import { Cloud, Folder_Cloud, Trash } from "../../models/models.js";

import StructFolder from "../../classes/Folder/StructFolder.js";
import Files from "../../classes/Files/Files.js";

import verifyToken from "../../utils/verifyToken.js";
import archiveFolder from "../../utils/archiveFolder.js";

import getPlain from "../../utils/getPlain.js";
import TrashClass from "../../classes/Trash/Trash.js";
import saveFolder from "../../utils/saveFolder.js";

export const set_file = asyncHandler(async (req: reqTypes.set_file, res) => {
  const userId = await verifyToken(req, res);
  if (!userId) return;

  const { files, body } = req;
  const struct = body.struct;

  if (!files) return;
  if (!Array.isArray(files)) return;
  const saveFiles = (files: Express.Multer.File[]) => {
    return Promise.all(
      files.map(async (file) => {
        const val = await Cloud.create({
          userId,
          type: file.mimetype,
          name: file.filename,
          size: file.size,
        });
        return val.get({ plain: true });
      })
    );
  };

  if (!struct) {
    await saveFiles(files);
    res.status(200).json("ok");
    return;
  }

  const savedFiles = await saveFiles(files);
  const filesDB = savedFiles.map((file) => ({
    ...file,
    name: file.name.split("#-#")[1],
  }));

  const structFolder = new StructFolder(JSON.parse(struct));
  const folders = structFolder.setFilesInStruct(filesDB);

  await saveFolder(folders, userId);
  res.status(200).json("ok");
});

export const get_files = asyncHandler(async (req: reqTypes.get_files, res) => {
  const { filter, folderId, search, order, trash, limit, page } = req.query;
  const userId = await verifyToken(req, res);
  if (!userId) return;

  const files = new Files({ userId, filter, search, order, limit, page });
  const { data, count } = await files.get({ trash, folderId });
  res.header("X-Total-Count", count.toString()).status(200).json(data);
});

export const get_folder = asyncHandler(
  async (req: reqTypes.get_folder, res) => {
    const { id } = req.query;
    const userId = await verifyToken(req, res);
    if (!userId) return;

    const files = new Files({ userId });
    const data = await files.get({ folderId: id });

    if (!data) {
      res.status(404).json("");
      return;
    }

    res.status(200).json(data);
  }
);

export const update_name = asyncHandler(
  async (req: reqTypes.update_name, res) => {
    const { id, name } = req.body;
    const userId = await verifyToken(req, res);
    if (!userId) return;

    const file = await Cloud.findOne({
      where: { id },
    }).then(getPlain);

    if (!file) {
      res.status(404).json("not found");
      return;
    }

    if (file.type === "folder") {
      Cloud.update({ name }, { where: { id } });
      res.status(200).json("Ok");
      return;
    }

    const fileType = file.name.split(".")[1];
    const fileId = file.name.split("#-#")[0];
    const newFileName = fileId + "#-#" + name + "." + fileType;
    Cloud.update({ name: newFileName }, { where: { id } });

    res.status(200).json("Ok");
  }
);

export const delete_file = asyncHandler(
  async (req: reqTypes.delete_file, res) => {
    const { id, trash } = req.body;
    const userId = await verifyToken(req, res);
    if (!userId) return;

    const trashClass = new TrashClass(userId, id, res);

    trash ? await trashClass.destroy() : await trashClass.addTrash();
  }
);

export const update_folder_cloud = asyncHandler(
  async (req: reqTypes.update_folder_cloud, res) => {
    const { fileId, folderId } = req.body;
    const userId = await verifyToken(req, res);
    if (!userId) return;

    //Получаем файл и его размер
    const file = await Cloud.findOne({
      where: {
        id: fileId,
      },
    }).then(getPlain);

    if (!file) {
      res.status(404).json("not found");
      return;
    }
    const fileSize = file.size;

    //Если файл закинули в папку
    if (folderId > 0) {
      const folder = await Cloud.findOne({
        where: {
          id: folderId,
        },
      });

      if (!folder) {
        res.status(404).json("not found");
        return;
      }

      const folderSize = folder.get({ plain: true }).size;
      const newFolderSize = Number(folderSize) + Number(fileSize);

      await folder.update({ size: newFolderSize });
      await Folder_Cloud.destroy({ where: { cloudId: fileId } });
      await Folder_Cloud.build({ cloudId: fileId, folderId }).save();
      res.status(200).json("Ok");
      return;
    }

    //Если файл выбросили из папки (folderId === -1)
    //Узнаем из какой
    const childrenFolder = await Folder_Cloud.findOne({
      where: { cloudId: fileId },
    }).then((item) => getPlain(item)?.folderId);

    const folder = await Cloud.findOne({
      where: {
        id: childrenFolder,
      },
    });
    if (!folder) return;

    //Изменияем размер папки
    const folderSize = folder.get({ plain: true }).size;
    const newFolderSize = Number(folderSize) - Number(fileSize);
    await folder.update({ size: newFolderSize });

    //Пытаеммся получить родителя папки
    const parentFolder = await Folder_Cloud.findOne({
      where: { cloudId: childrenFolder },
    }).then((item) => getPlain(item)?.folderId);

    //Если есть родитель
    if (parentFolder) {
      await Folder_Cloud.destroy({ where: { cloudId: fileId } });
      Folder_Cloud.build({ cloudId: fileId, folderId: parentFolder }).save();
      res.status(200).json("Ok");
      return;
    }

    //Если нет
    Folder_Cloud.destroy({ where: { cloudId: fileId } });
    res.status(200).json("Ok");
  }
);

export const recover_file = asyncHandler(
  async (req: reqTypes.recover_file, res) => {
    const { id } = req.body;
    const userId = await verifyToken(req, res);
    if (!userId) return;

    Trash.destroy({ where: { cloudId: id } });

    res.status(200).json("Ok");
  }
);

export const download = asyncHandler(async (req: reqTypes.download, res) => {
  const { id } = req.query;
  const userId = await verifyToken(req, res);
  if (!userId) return;

  if (id < 0) {
    res.status(400).json("cancel");
    return;
  }

  const file = await Cloud.findOne({ where: { id } }).then(getPlain);

  if (!file) {
    res.status(404).json("not found");
    return;
  }

  if (file.type !== "folder") {
    const fileName = file.name.split("#-#")[1];
    const filePath = `./media/${file.name}`;
    res.status(200).download(filePath, fileName);
    return;
  }

  archiveFolder(res, file);
  return;
});
