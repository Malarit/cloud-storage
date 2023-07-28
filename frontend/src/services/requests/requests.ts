import axios, { AxiosResponse } from "axios";
import config from "../../../config";
import { get, post } from "./types";
import createFormData from "../../utils/createFormData";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = config.BASE_SERVER_URL;

//post
export const authorization: post["authorization"] = (data) =>
  axios.post("/authorization", data);

export const registration: post["registration"] = (data) =>
  axios.post("/registration", data);

export const cloud: post["cloud"] = (data, onUploadProgress) => {
  const { isDirectory, directoryName, files } = data;

  const formData = new FormData();
  console.log(files[2])
  for (let i = 0; i < Object.keys(files).length; i++) {
    formData.append("files", files[i]);
  }
  if (isDirectory && directoryName) {
    formData.append("directory", directoryName);
  }

  return axios.post("/cloud", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress,
  });
};

//get
export const itsMe = () =>
  axios
    .get<get["itsMe"]>("/itsMe")
    .then((res) => res.data)
    .catch(() => ({ userId: undefined }));
