import { AxiosProgressEvent, AxiosResponse } from "axios";
import { structFolder } from "../../utils/scanFile/types";

type axiResponse = Promise<AxiosResponse<any, any>>;

//post
type authorization = (data: { email: string; password: string }) => axiResponse;
type registration = (data: { email: string; password: string }) => axiResponse;
type cloud = (cloud: {
  data: structFolder | File;
  indexFile?: number;
  onUploadProgress?: (
    e: AxiosProgressEvent,
    indexFile: number | undefined
  ) => void;
  signal?: AbortSignal;
}) => axiResponse;
type update_folder_cloud = (data: {
  fileId: number;
  folderId: number;
}) => axiResponse;
type delete_file = (data: { id: number; trash?: boolean }) => axiResponse;
type update_name = (data: { id: number; name: string }) => axiResponse;
type recover_file = (data: { id: number }) => axiResponse;
type updateUserData = (data: { userName?: string; email?: string }) => axiResponse;

export interface post {
  authorization: authorization;
  registration: registration;
  cloud: cloud;
  update_folder_cloud: update_folder_cloud;
  delete_file: delete_file;
  update_name: update_name;
  recover_file: recover_file;
  updateUserData: updateUserData;
}

//get
type itsMe = { userId: number };
type files = {
  id: number;
  type: "folder" | "file";
  name: string;
  size: string;
  createdAt: string;
  updatedAt: string;
};
type folder_get = {
  folder: files;
  files: files[];
};
type download = Blob;

type userData = { userName: string; email: string };

export interface get {
  itsMe: itsMe;
  cloud: {
    files: files[];
    prevOffset: number;
    totalCount: number;
  };
  folder: folder_get;
  download: download;
  userData: userData;
}

//params get
export type cloud_get_params = {
  filter?: string;
  folderId?: number;
  search?: string;
  trash?: boolean;
  limit?: number;
  page?: number;
  order?: { table: "name" | "date" | "size"; sort: "ASC" | "DESC" };
};

export interface params_get {
  cloud: cloud_get_params;
}
