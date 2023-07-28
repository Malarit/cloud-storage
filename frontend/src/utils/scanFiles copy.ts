export type fileContainer = {
  isDirectory: boolean;
  directoryName?: string;
  files: File[];
};

function scanFiles(item: FileSystemEntry, container?: fileContainer) {
  if (!container) container = { isDirectory: false, files: [] };
  if (item.isDirectory) {
    const _item = item as FileSystemDirectoryEntry;
    container.isDirectory = true;
    container.directoryName = _item.name;
    const directoryReader = _item.createReader();
    directoryReader.readEntries((entries) => {
      entries.forEach((entry) => {
        scanFiles(entry, container);
      });
    });
  } else {
    const _item = item as FileSystemFileEntry;
    _item.file((file) => {
      container?.files.push(file);
    });
  }
  return container;
}

export default scanFiles;
