import { ModelDefined, Optional } from "sequelize";

type nodeAttributes<T, key extends keyof T> = Optional<T, key>;
type OptionalKeys<T extends object> = {
  [P in keyof T]: {} extends Pick<T, P> ? P : never;
}[keyof T];
type Model<T extends {}> = ModelDefined<
  Required<T>,
  nodeAttributes<T, OptionalKeys<T>>
>;

interface user {
  id?: number;
  userName: string;
  email: string;
  password: string;
}

interface cloud {
  id?: number;
  userId: number;
  type: string;
  name: string;
  size: string;
}

interface folder_Cloud {
  id?: number;
  folderId: number;
  cloudId: number;
}

interface trash {
  id?: number;
  userId: number;
  cloudId: number;
}

export type user_model = Model<user>;
export type cloud_model = Model<cloud>;
export type folder_Cloud_model = Model<folder_Cloud>;
export type trash_model = Model<trash>;
