import Folder from "./Folder";
import { container, readFileType, scanFilesType } from "./types";

const readFile: readFileType = (item) => {
  return new Promise((resolve) => {
    item.file((file) => resolve(file));
  });
};

const scanFiles: scanFilesType = (item) => {
  return new Promise((resolve) => {
    if (item.isFile) {
      readFile(item as FileSystemFileEntry).then((file) => resolve(file));
      return;
    }

    const _item = item as FileSystemDirectoryEntry;
    const newFolder = new Folder(_item.name);

    const directoryReader = _item.createReader();
    directoryReader.readEntries((entries) => {
      const scannedFiles = entries.map((entry) => scanFiles(entry));
      const resolveEntry = (entries: unknown[]) => {
        const files = entries as container[];
        newFolder?.files.push(...files);
        resolve(newFolder as Folder);
      };
      return Promise.all(scannedFiles).then(resolveEntry);
    });
  });
};

export default scanFiles;
