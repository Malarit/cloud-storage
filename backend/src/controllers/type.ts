import { Request } from "express";

export interface TypedRequest<T> extends Request<{}, {}, T, T> {
  body: T;
  query: T;
}