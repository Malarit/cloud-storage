import { AxiosProgressEvent, AxiosResponse } from "axios";
import { structFolder } from "../../utils/scanFile/types";

type axiResponse = Promise<AxiosResponse<any, any>>;

type authorization = (data: { email: string; password: string }) => axiResponse;
type registration = (data: { email: string; password: string }) => axiResponse;
type cloud = (cloud: {
  data: structFolder | File;
  onUploadProgress?: (
    e: AxiosProgressEvent,
    indexFile: number | undefined
  ) => void;
  indexFile?: number;
}) => axiResponse;

export interface post {
  authorization: authorization;
  registration: registration;
  cloud: cloud;
}

type itsMe = { userId: number };
type cloud_get = {
  id: number;
  type: "folder" | "file";
  name: string;
  size: string;
  createdAt: string;
  updatedAt: string;
};
type folder_get = {
  folder: cloud_get;
  files: cloud_get[];
};

export interface get {
  itsMe: itsMe;
  cloud: cloud_get[];
  folder: folder_get;
}

export interface params_get {}
