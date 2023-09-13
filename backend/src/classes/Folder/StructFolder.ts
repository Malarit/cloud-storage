import Folder from "./Folder.js";
import { structFolder } from "./type.js";

class StructFolder {
  struct: structFolder;

  constructor(struct: structFolder) {
    this.struct = struct;
  }

  setFilesInStruct<T extends { name: string; id: number }>(files: T[]) {
    let copyFiles = [...files];
    const copyStruct = structuredClone(this.struct);

    const get = (struct: Folder<string | T>) => {
      const { files: filesStruct } = struct;

      filesStruct.map((file, i) => {
        if (typeof file === "string") {
          const fileFind = copyFiles.find((item) => {
            return item.name === file;
          });
          if (!fileFind) return;

          filesStruct[i] = fileFind;
          copyFiles = copyFiles.filter((file) => file.id !== fileFind.id);
          return;
        }

        get(file as Folder<string>);
      });
    };
    get(copyStruct);

    return copyStruct as unknown as Folder<T>;
  }
}

export default StructFolder;
