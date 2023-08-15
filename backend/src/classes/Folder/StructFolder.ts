import Folder from "./Folder.js";
import { structFolder } from "./type.js";

class StructFolder {
  struct: structFolder;

  constructor(struct: structFolder) {
    this.struct = struct;
  }

  setFilesInStruct<T extends { name: string }>(files: T[]) {
    const copyStruct = structuredClone(this.struct);

    const get = (struct: Folder<string | T>) => {
      const { files: filesStruct } = struct;

      filesStruct.map((file, i) => {
        if (typeof file === "string") {
          const fileFind = files.find((item) => {
            return item.name === file;
          });
          if (!fileFind) return;
          filesStruct[i] = fileFind;
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
