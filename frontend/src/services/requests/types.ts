import { AxiosProgressEvent, AxiosResponse } from "axios";
import { fileContainer } from "../../utils/scanFiles";

type axiResponse = Promise<AxiosResponse<any, any>>;

type authorization = (data: { email: string; password: string }) => axiResponse;
type registration = (data: { email: string; password: string }) => axiResponse;
type cloud = (
  data: fileContainer,
  onUploadProgress?: (e: AxiosProgressEvent) => void
) => axiResponse;

export interface post {
  authorization: authorization;
  registration: registration;
  cloud: cloud;
}

type itsMe = { userId: number };

export interface get {
  itsMe: itsMe;
}

export interface params_get {}
