import asyncHandler from "express-async-handler";
import * as reqTypes from "./type.js";
import verifyToken from "../../utils/verifyToken.js";
import { Cloud, Trash } from "../../models/models.js";
import StructFolder from "../../classes/Folder/StructFolder.js";
import saveFolder from "./saveFolder.js";
import Files from "../../classes/Files/Files.js";

export const set_file = asyncHandler(async (req: reqTypes.set_file, res) => {
  const userId = await verifyToken(req, res);
  if (!userId) return;

  const { files, body } = req;
  const struct = body.struct;

  if (!files) return;
  if (!Array.isArray(files)) return;
  const saveFiles = (files: Express.Multer.File[]) => {
    return Promise.all(
      files.map((file) => {
        return Cloud.create({
          userId,
          type: file.mimetype,
          name: file.filename,
          size: Math.round(file.size / 1024) + "KB",
        }).then((val) => val.get({ plain: true }));
      })
    );
  };

  if (!struct) {
    saveFiles(files);
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

  saveFolder(folders, userId);
  res.status(200).json("ok");
});

export const get_files = asyncHandler(async (req: reqTypes.get_files, res) => {
  const { filter, folderId } = req.query;
  const userId = await verifyToken(req, res);
  if (!userId) return;

  const files = new Files(userId);
  const data = await files.get(filter, folderId);

  res.status(200).json(data);
});

export const get_folder = asyncHandler(
  async (req: reqTypes.get_folder, res) => {
    const { id } = req.query;
    const userId = await verifyToken(req, res);
    if (!userId) return;

    const files = new Files(userId);
    const data = await files.getFolder(id);

    if (!data) {
      res.status(404).json("");
      return;
    }

    res.status(200).json(data);
  }
);

export const update_name = asyncHandler(
  async (req: reqTypes.update_name, res) => {
    const { id, name } = req.query;
    const userId = await verifyToken(req, res);
    if (!userId) return;

    Cloud.update({ name }, { where: { id } });

    res.status(200).json("Ok");
  }
);

export const delete_file = asyncHandler(
  async (req: reqTypes.delete_file, res) => {
    const { id } = req.query;
    const userId = await verifyToken(req, res);
    if (!userId) return;

    Trash.build({ userId, cloudId: id }).save();

    res.status(200).json("Ok");
  }
);
