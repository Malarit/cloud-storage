import { ModelDefined, Optional } from "sequelize";

export type nodeAttributes<T, key extends keyof T> = Optional<T, key>;

interface user {
  id: number;
  userName: string;
  email: string;
  password: string;
}
export type user_model = ModelDefined<user, nodeAttributes<user, "id">>;
