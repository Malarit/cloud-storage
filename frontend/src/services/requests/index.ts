import {
  authorization,
  registration,
  itsMe,
  cloud,
  cloud_get,
} from "./requests";

export const post = {
  authorization,
  registration,
  cloud,
};

export const get = {
  itsMe,
  cloud: cloud_get,
};
