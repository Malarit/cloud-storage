import { Model } from "sequelize";

function getPlainArr<T extends Model>(arr: T[]): T["dataValues"][] {
  return arr.map((item) => item.get({ plain: true }));
}

export default getPlainArr;
