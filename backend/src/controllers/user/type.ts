import { TypedRequest } from "../type.js";

export type authorization = TypedRequest<{
  email: string;
  password: string;
}>;

export type registration = TypedRequest<{
  userName: string;
  password: string;
  email: string;
}>;

export type updateUserData = TypedRequest<{
  userName: string;
  email: string;
}>;
