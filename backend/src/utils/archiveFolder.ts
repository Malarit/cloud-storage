import archiver from "archiver";
import { Response } from "express";
import { cloud } from "../models/types.js";
import { Cloud, Folder_Cloud } from "../models/models.js";

const archiveFolder = async (res: Response, folder: cloud) => {
  const archive = archiver("zip");
  function reduceId<T extends { [key: string]: any }>(arr: T[], key: keyof T) {
    return arr.reduce<number[]>((prev, curr) => {
      prev.push(curr[key]);
      return prev;
    }, []);
  }

  archive.on("error", function (err) {
    res.status(500).send({ error: err.message });
  });

  res.attachment(folder.name + ".zip");

  archive.pipe(res);

  const save = async (
    folder: cloud,
    archive: archiver.Archiver,
    path: string = ""
  ) => {
    const folderFiles = await Folder_Cloud.findAll({
      where: { folderId: folder.id },
    }).then((files) => files.map((file) => file.get({ plain: true })));
    const folderFilesId = reduceId(folderFiles, "cloudId");
    const files = await Cloud.findAll({ where: { id: folderFilesId } }).then(
      (files) => files.map((file) => file.get({ plain: true }))
    );

    await Promise.all(
      files.map((file) => {
        if (file.type === "folder") {
          return save(file, archive, path + folder.name + "/");
        }
        archive.file(`./media/${file.name}`, {
          name: file.name.split("#-#")[1],
          prefix: path + folder.name,
        });
      })
    );
  };

  await save(folder, archive);
  archive.finalize();
};

export default archiveFolder;
