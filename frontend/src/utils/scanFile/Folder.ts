import { structFolder } from "./types";

class Folder<T = File> {
  folderName: string;
  files: (Folder | T)[] = [];
  constructor(folderName: string) {
    this.folderName = folderName;
  }

  getStruct(): structFolder {
    const folderClone: Folder<File | string> = structuredClone(this);
    const files: File[] = [];

    const get = (folder: Folder<File | string>) => {
      folder.files.map((file, i) => {
        if (file instanceof File) {
          folder.files[i] = file.name;
          files.push(file);
          return;
        }
        get(file as Folder<File | string>);
      });
    };
    get(folderClone);
    return { struct: folderClone as Folder<string>, files };
  }

  addFileByPath(file: File) {
    let activeFolder = this as Folder<File>;
    const splitPath = file.webkitRelativePath.split("/");

    if (!this.folderName) this.folderName = splitPath[0];

    for (let i = 1; i < splitPath.length; i++) {
      if (i < splitPath.length - 1) {
        const newActiveFolder = activeFolder.files.find(
          (file) => file instanceof Folder && file.folderName === splitPath[i]
        ) as Folder<File>;

        if (!newActiveFolder) {
          const folder = new Folder(splitPath[i]);
          activeFolder.files.push(folder);
          activeFolder = folder;
        } else {
          activeFolder = newActiveFolder;
        }
        continue;
      }
      activeFolder.files.push(file);
    }
  }
}

export default Folder;
