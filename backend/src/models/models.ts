import Sequelize, { DataTypes, ModelDefined } from "sequelize";
import sequelize from "../db/index.js";

import * as mt from "./types.js";

export const User: mt.user_model = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export const Cloud: mt.cloud_model = sequelize.define("Cloud", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
User.hasMany(Cloud, {
  foreignKey: "userId",
});

export const Folder_Cloud: mt.folder_Cloud_model = sequelize.define(
  "Folder_Cloud",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    folderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cloudId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }
);
Cloud.hasMany(Folder_Cloud, {
  foreignKey: "folderId",
});
Cloud.hasMany(Folder_Cloud, {
  foreignKey: "cloudId",
});

export const Trash: mt.trash_model = sequelize.define("Trash", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cloudId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
User.hasMany(Trash, {
  foreignKey: "userId",
});
