import axios, { AxiosProgressEvent } from "axios";
import config from "../../../config";
import { get, params_get, post } from "./types";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = config.BASE_SERVER_URL;

//post
export const authorization: post["authorization"] = (data) =>
  axios.post("/authorization", data);

export const registration: post["registration"] = (data) =>
  axios.post("/registration", data);

export const cloud: post["cloud"] = (cloud) => {
  const { data, onUploadProgress, indexFile, signal } = cloud;

  const formData = new FormData();
  if (data instanceof File) {
    formData.append("files", data);
  } else {
    const { struct, files } = data;
    files.map((file) => formData.append("files", file));
    formData.append("struct", JSON.stringify(struct));
  }

  return axios.post("/cloud", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => onUploadProgress?.(e, indexFile),
    responseType: "stream",
    signal,
  });
};

export const update_folder_cloud: post["update_folder_cloud"] = (data) =>
  axios.post("/updateFolderCloud", data);

export const delete_file: post["delete_file"] = (data) =>
  axios.post("/trash", data);

export const update_name: post["update_name"] = (data) =>
  axios.post("/updateName", data);

export const recover_file: post["recover_file"] = (data) =>
  axios.post("/recoverFile", data);

export const updateUserData: post["updateUserData"] = (data) =>
  axios.post("/updateUserData", data);

//get
export const userData = () =>
  axios.get<get["userData"]>("/userData").then((res) => res.data);

export const exitLogin = () => axios.get("/exitLogin");

export const itsMe = () =>
  axios
    .get<get["itsMe"]>("/itsMe")
    .then((res) => res.data)
    .catch(() => ({ userId: undefined }));

export const cloud_get = (params?: params_get["cloud"]) =>
  axios
    .get("/cloud", { params: { ...params, page: Number(params?.page) } })
    .then((res) => ({
      files: res.data,
      prevOffset: params?.page,
      totalCount: +res.headers["x-total-count"],
    })) as Promise<get["cloud"]>;

export const download = (
  params: { id: number },
  onDownloadProgress?: (e: AxiosProgressEvent) => void,
  signal?: AbortSignal
) =>
  axios
    .get<get["download"]>("/download", {
      params,
      responseType: "blob",
      onDownloadProgress,
      signal,
    })
    .then((res) => res.data);
