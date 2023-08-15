import axios from "axios";
import config from "../../../config";
import { get, post } from "./types";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = config.BASE_SERVER_URL;

//post
export const authorization: post["authorization"] = (data) =>
  axios.post("/authorization", data);

export const registration: post["registration"] = (data) =>
  axios.post("/registration", data);

export const cloud: post["cloud"] = (cloud) => {
  const { data, onUploadProgress, indexFile } = cloud;

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
  });
};

//get
export const itsMe = () =>
  axios
    .get<get["itsMe"]>("/itsMe")
    .then((res) => res.data)
    .catch(() => ({ userId: undefined }));

export const cloud_get = (params?: { filter?: string, folderId?: number }) =>
  axios.get<get["cloud"]>("/cloud", { params }).then((res) => res.data);


