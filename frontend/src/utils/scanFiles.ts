export type fileContainer = {
  isDirectory: boolean;
  directoryName?: string;
  files: File[];
};

function scanFiles(item: FileSystemEntry, container?: fileContainer) {
  return new Promise((resolve) => {
    if (!container) container = { isDirectory: false, files: [] };
    if (item.isDirectory) {
      const _item = item as FileSystemDirectoryEntry;
      container.isDirectory = true;
      container.directoryName = _item.name;
      const directoryReader = _item.createReader();
      directoryReader.readEntries((entries) => {
        Promise.all(entries.map((entry) => scanFiles(entry, container))).then(
          resolve
        );
      });
    } else {
      const _item = item as FileSystemFileEntry;
      _item.file((file) => {
        container?.files.push(file);
        resolve(container);
      });
    }
    return container;
  });
}

export default scanFiles;

// export type fileContainer = {
//   isDirectory: boolean;
//   directoryName?: string;
//   files: File[];
// };

// function readFolder(item: FileSystemEntry) {
//   const _item = item as FileSystemDirectoryEntry;
//   let entriesList: FileSystemEntry[] = [];
//   const directoryReader = _item.createReader();
//   directoryReader.readEntries((entries) => {
//     entriesList = entries;
//   });
//   return entriesList;
// }

// async function readFile(item: FileSystemEntry, cb: (file: File) => void) {
//   const _item = item as FileSystemFileEntry;
//   _item.file((file) => cb(file));
// }

// function scanFiles(item: FileSystemEntry, cb: (file: any) => void) {
//   let container = { isDirectory: false, files: [] };
//   const isFile = item.isFile;

//   if (isFile) {
//     return readFile(item, cb);
//   }

//   const entries = readFolder(item);
//   cb(entries);
// }

// export default scanFiles;
