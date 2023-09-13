import { Response } from "express";
import { Cloud, Folder_Cloud } from "../../models/models.js";
import { Trash as TrashModel } from "../../models/models.js";
import getPlain from "../../utils/getPlain.js";
import * as fs from "fs";
import { config } from "../../config/config.js";
import { cloud } from "../../models/types.js";

class TrashClass {
  private userId: number;
  private fileId: number;
  private res: Response;

  constructor(userId: number, fileId: number, res: Response) {
    this.userId = userId;
    this.fileId = fileId;
    this.res = res;
  }

  private getArrFromArrObjByKey<T extends { [key: string]: any }>(
    arr: T[],
    key: keyof T
  ) {
    return arr.reduce<number[]>((prev, curr) => {
      prev.push(curr[key]);
      return prev;
    }, []);
  }

  private deleteFile(fileName: string) {
    try {
      fs.unlinkSync(config.saveFileDestination + fileName);
    } catch {}
  }

  private async getFile() {
    const file = await Cloud.findOne({
      where: {
        id: this.fileId,
      },
    });
    return file;
  }

  private async destroyFolder(folderId: number) {
    const folderFiles = await Folder_Cloud.findAll({ where: { folderId } });
    const folderFilesPlain = folderFiles.map((file) => {
      file.destroy();
      return file.get({ plain: true });
    });
    const folderFilesId = this.getArrFromArrObjByKey(
      folderFilesPlain,
      "cloudId"
    );

    const files = await Cloud.findAll({ where: { id: folderFilesId } });

    await Promise.all(
      files.map((file) => {
        const filePlain = file.get({ plain: true });
        if (filePlain.type === "folder") {
          return this.destroyFolder(filePlain.id);
        }

        file.destroy();
        TrashModel.destroy({ where: { id: filePlain.id } });
        this.deleteFile(filePlain.name);
      })
    );

    Cloud.destroy({ where: { id: folderId } });
    TrashModel.destroy({ where: { id: folderId } });
  }

  private async updateSize(file: cloud, folder?: cloud) {
    const parentFolder = await Folder_Cloud.findOne({
      where: { cloudId: folder?.id || file.id },
    }).then(getPlain);
    if (!parentFolder) return;

    const findFolder = await Cloud.findOne({
      where: { id: parentFolder.folderId },
    });
    if (!findFolder) return;
    const findFolderPlain = findFolder.get({ plain: true });

    const newFolderSize = findFolderPlain.size - file.size;
    findFolder.update({ size: newFolderSize });

    const parentId = await Folder_Cloud.findOne({
      where: { cloudId: findFolderPlain.id },
    }).then(getPlain);
    if (!parentId) return;

    const parent = await Cloud.findOne({
      where: { id: parentId.folderId },
    }).then(getPlain);
    if (!parent) return;

    this.updateSize(file, parent);
  }

  async addTrash() {
    const file = await this.getFile();
    if (!file) {
      this.res.status(404).json("not found");
      return;
    }
    TrashModel.build({ userId: this.userId, cloudId: this.fileId }).save();
    this.res.status(200).json("Ok");
    return;
  }

  async destroy() {
    const file = await this.getFile();
    const filePlain = file?.get({ plain: true });

    if (!file || !filePlain) {
      this.res.status(404).json("not found");
      return;
    }

    await this.updateSize(filePlain);

    if (filePlain.type !== "folder") {
      this.deleteFile(filePlain.name);
      file.destroy();
      await TrashModel.destroy({ where: { cloudId: this.fileId } });
      await Folder_Cloud.destroy({ where: { cloudId: this.fileId } });
      this.res.status(200).json("Ok");
      return;
    }

    await this.destroyFolder(filePlain.id);
    this.res.status(200).json("Ok");
    return;
  }
}

export default TrashClass;
