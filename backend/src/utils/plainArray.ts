import { Model } from "sequelize";

function plainArray<T extends Model[]>(data: T) {
  return data.map((item) => item.get({ plain: true }))
}

export default plainArray;
