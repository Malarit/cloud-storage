import { Op, Order, Sequelize } from "sequelize";
import { Cloud, Folder_Cloud, Trash } from "../../models/models.js";
import getPlainArr from "../../utils/getPlainArr.js";
import getPlain from "../../utils/getPlain.js";
import sizeFileConventor from "../../utils/sizeFileConventor.js";

export type filters = "all files" | "folder" | "image" | "application";
export type tableOrderNames = "name" | "date" | "size";
export type orderType = { table: tableOrderNames; sort: "ASC" | "DESC" };
export type getOpt = { trash?: boolean; folderId?: number };

type constructorType = {
  userId: number;
  filter?: filters;
  order?: orderType;
  search?: string;
  limit?: number;
  page?: number;
};

class Files {
  private userId: number;
  private filter?: Exclude<filters, "all files">;
  private order?: orderType;
  private search?: string;
  private limit?: number;
  private page?: number;

  constructor(data: constructorType) {
    const { userId, filter, order, search, limit, page } = data;
    this.userId = userId;
    this.order = order;
    this.search = search;
    this.filter = filter === "all files" ? undefined : filter;
    this.limit = limit;
    this.page = page;
  }

  private getPagination() {
    if (!this.page || !this.limit) return {};
    return { offset: this.page * this.limit, limit: this.limit };
  }

  private getOrderQuery() {
    const orderFolders = Sequelize.literal(
      `(case when type = 'folder' then 1 end)`
    );
    const defaultOrder = [
      [orderFolders, "ASC"],
      ["id", "ASC"],
    ];
    if (!this.order) return defaultOrder as Order;

    const { table, sort } = this.order;
    const names: { [key in tableOrderNames]: string } = {
      date: "createdAt",
      name: "name",
      size: "size",
    };

    return [
      [orderFolders, "ASC"],
      [names[table], sort],
    ] as Order;
  }

  private getWhereNameSearch() {
    return this.search
      ? { [Op.like]: "%" + this.search + "%" }
      : { [Op.like]: "%" };
  }

  private getWhereFilter() {
    return this.filter ? { [Op.like]: this.filter + "%" } : { [Op.like]: "%" };
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

  private async getFilesInFolder(id: number) {
    const folder = await Cloud.findOne({
      attributes: { exclude: ["userId"] },
      where: {
        id,
      },
    }).then(getPlain);

    if (!folder) return [];

    const files = await Folder_Cloud.findAll({
      where: {
        folderId: folder.id,
      },
    }).then(getPlainArr);

    return files;
  }

  private async getArrTrashId() {
    const trash = await Trash.findAll({
      where: { userId: this.userId },
    }).then(getPlainArr);

    return this.getArrFromArrObjByKey(trash, "cloudId");
  }

  private async getArrFilesIdInFolderCloud() {
    const files = await Folder_Cloud.findAll().then(getPlainArr);
    return this.getArrFromArrObjByKey(files, "cloudId");
  }

  async getWhereId(opt?: getOpt) {
    const { trash, folderId } = opt || {};
    const arrTrashId = await this.getArrTrashId();

    if (folderId) {
      const filesInFolder = await this.getFilesInFolder(folderId);
      const arrIdFiles = this.getArrFromArrObjByKey(filesInFolder, "cloudId");
      return { [Op.in]: arrIdFiles, [Op.notIn]: arrTrashId };
    }

    if (trash) {
      return arrTrashId;
    }

    const arrFilesIdFolderCloud = await this.getArrFilesIdInFolderCloud();
    return { [Op.not]: arrTrashId.concat(arrFilesIdFolderCloud) };
  }

  /**
   * Возвращает файлы из бд
   * @param trash если true, то вернет файлы из корзины
   * @param folderId если указано, то вернет файлы из папки
   * @returns data - файлы, count - количество оставшихся записей
   */
  async get(opt?: getOpt) {
    const { convert } = sizeFileConventor();
    const { rows, count } = await Cloud.findAndCountAll({
      attributes: { exclude: ["userId"] },
      where: {
        id: await this.getWhereId(opt),
        type: this.getWhereFilter(),
        name: this.getWhereNameSearch(),
      },
      order: this.getOrderQuery(),
      ...this.getPagination(),
    });

    const data = rows.map((file) => {
      const filePlain = file.get({ plain: true });

      if (filePlain.type !== "folder") {
        return {
          ...filePlain,
          name: filePlain.name.split("#-#")[1],
          size: convert(filePlain.size),
        };
      }

      return { ...filePlain, size: convert(filePlain.size) };
    });

    return { data, count };
  }
}

export default Files;
