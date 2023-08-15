import { Op } from "sequelize";
import { Cloud, Folder_Cloud } from "../../models/models.js";
import { cloud } from "../../models/types.js";

export type filters = "all files" | "folder" | "image" | "application";

class Files {
  private userId: number;
  constructor(userId: number) {
    this.userId = userId;
  }

  private reduceId<T extends { [key: string]: any }>(arr: T[], key: keyof T) {
    return arr.reduce<number[]>((prev, curr) => {
      prev.push(curr[key]);
      return prev;
    }, []);
  }

  private async get_cloud_id(folders: cloud[] | cloud) {
    const folderId = Array.isArray(folders)
      ? this.reduceId(folders, "id")
      : folders.id;
    return await Folder_Cloud.findAll({
      where: {
        folderId: folderId,
      },
    }).then((val) => val.map((folder) => folder.get({ plain: true })));
  }

  async getFolders() {
    const folders = await Cloud.findAll({
      attributes: { exclude: ["userId"] },
      where: {
        userId: this.userId,
        type: "folder",
      },
    }).then((val) => val.map((folder) => folder.get({ plain: true })));

    const cloud_id = await this.get_cloud_id(folders);
    const files_id = this.reduceId(cloud_id, "cloudId");

    const parentFolders = folders.filter(
      (folder) => !files_id.includes(folder.id)
    );

    const data = {
      folders: parentFolders,
      getArrId: () => this.reduceId(folders, "id"),
      get_cloud_id: () => cloud_id,
    };

    return data;
  }

  async getFolder(id: number, filter?: filters) {
    const folder = await Cloud.findOne({
      attributes: { exclude: ["userId"] },
      where: {
        id,
      },
    }).then((folder) => folder?.get({ plain: true }));

    if (!folder) return;

    const folder_cloud_id = await this.get_cloud_id(folder);
    const folder_files_id = this.reduceId(folder_cloud_id, "cloudId");
    const where_filter = filter
      ? { [Op.like]: filter + "%" }
      : { [Op.like]: "%" };

    const files = await Cloud.findAll({
      attributes: { exclude: ["userId"] },
      where: {
        id: folder_files_id,
        type: where_filter,
      },
    }).then((val) => val.map((file) => file.get({ plain: true })));

    const sortedFiles = files.sort((file) => file.type === "folder" ? -1 : 1);

    return {
      folder,
      files: sortedFiles,
    };
  }

  async getFiles(filter?: Exclude<filters, "folder">) {
    const folders = await this.getFolders();
    const folder_cloud_id = await folders.get_cloud_id();
    const folder_files_id = this.reduceId(folder_cloud_id, "cloudId");

    const where_filter = filter ? { [Op.like]: filter + "%" } : undefined;

    const files = await Cloud.findAll({
      attributes: { exclude: ["userId"] },
      where: {
        id: {
          [Op.not]: folder_files_id,
        },
        userId: this.userId,
        type: {
          [Op.not]: "folder",
          ...where_filter,
        },
      },
    }).then((val) => val.map((file) => file.get({ plain: true })));

    const data = files.map((file) => ({
      ...file,
      name: file.name.split("#-#")[1],
    }));

    return { files: data, getFolders: () => folders.folders };
  }

  async get(filter: filters = "all files", folderId?: number) {

    if (folderId) {
      const _filter = filter === "all files" ? undefined : filter;
      return this.getFolder(folderId, _filter).then((folder) => folder?.files);
    }

    switch (filter) {
      case "all files":
        const { files, getFolders } = await this.getFiles();
        return [...getFolders(), ...files];

      case "folder":
        return (await this.getFolders()).folders;

      default:
        return (await this.getFiles(filter)).files;
    }
  }
}

export default Files;
