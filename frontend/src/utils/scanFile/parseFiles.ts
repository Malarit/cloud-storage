import Folder from "./Folder";

const parseFiles = (files: File[]) => {
  const parentFolderName = files[0].webkitRelativePath.split("/")[0];
  if (!parentFolderName) return files;

  const folder = new Folder(parentFolderName);

  files.forEach((file) => {
    folder.addFileByPath(file)
  })

  return folder;
};

export default parseFiles;
