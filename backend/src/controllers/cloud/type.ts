import { filters } from "../../classes/Files/Files.js";
import { TypedRequest } from "../type.js";

export type set_file = TypedRequest<{
  struct?: string;
}>;

export type get_files = TypedRequest<{
  filter: filters;
  folderId?: number;
  search?: string;
  trash?: boolean;
  limit?: number;
  page?: number;
  order?: { table: "name" | "date" | "size"; sort: "ASC" | "DESC" };
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
  trash?: boolean;
}>;

export type update_folder_cloud = TypedRequest<{
  fileId: number;
  folderId: number;
}>;

export type recover_file = TypedRequest<{
  id: number;
}>;

export type download = TypedRequest<{
  id: number;
}>;

export type get_trash = TypedRequest<Omit<get_files["body"], "folderId">>;
