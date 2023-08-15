import { File } from "buffer";

class Folder<T = File> {
  folderName: string;
  files: (Folder<T> | T)[] = [];
  constructor(folderName: string) {
    this.folderName = folderName;
  }
}

export default Folder;
