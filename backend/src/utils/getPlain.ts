import { Model } from "sequelize";

function getPlain<T extends Model>(item: T | null): T["dataValues"] | null {
  return item?.get({ plain: true });
}

export default getPlain;
