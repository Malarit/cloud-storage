import Folder from "./Folder";

export type container = Folder<File> | File;

export type readFileType = (item: FileSystemFileEntry) => Promise<File>;
export type scanFilesType = (item: FileSystemEntry) => Promise<container>;
export type structFolder = { struct: Folder<string>; files: File[] };
