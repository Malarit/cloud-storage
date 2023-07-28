import { Request } from "express";

export interface TypedRequest<T> extends Request<{}, {}, T, T> {
  body: T;
  query: T;
}

export type authorization = TypedRequest<{
  email: string;
  password: string;
}>;

export type registration = TypedRequest<{
  userName: string;
  password: string;
  email: string;
}>;
