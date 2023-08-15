import { filters } from "../../classes/Files/Files.js";
import { TypedRequest } from "../type.js";

export type set_file = TypedRequest<{
  struct?: string;
}>;

export type get_files = TypedRequest<{
  filter: filters;
  folderId?: number;
}>;

export type get_folder = TypedRequest<{
  id: number;
}>;

export type update_name = TypedRequest<{
  id: number;
  name: string;
}>;

export type delete_file = TypedRequest<{
  id: number;
}>;