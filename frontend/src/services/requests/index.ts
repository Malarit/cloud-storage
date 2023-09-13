import {
  authorization,
  registration,
  itsMe,
  cloud,
  cloud_get,
  update_folder_cloud,
  delete_file,
  update_name,
  recover_file,
  download,
  userData,
  exitLogin,
  updateUserData,
} from "./requests";

export const post = {
  authorization,
  registration,
  cloud,
  update_folder_cloud,
  delete_file,
  update_name,
  recover_file,
  updateUserData,
};

export const get = {
  itsMe,
  cloud: cloud_get,
  download,
  userData,
  exitLogin,
};
