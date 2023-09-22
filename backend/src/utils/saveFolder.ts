import Folder from "../classes/Folder/Folder.js";
import { Cloud, Folder_Cloud } from "../models/models.js";
import { cloud } from "../models/types.js";

type resvalue = {
  fileId: number;
  size: string;
};
type save_folder = (folder: Folder<cloud>, userId: number) => Promise<any>;
type saveType = (
  folder: (resvalue | undefined)[],
  folderName: string,
  userId: number
) => any;
const save: saveType = async (folder, parentFolderName, userId) => {
  const folderData = folder.reduce<{ fileId: number[]; size: number }>(
    (prev, curr) => {
      if (!curr) return prev;
      const { fileId, size } = curr;
      prev.fileId.push(fileId);
      prev.size += Number(size);
      return prev;
    },
    { fileId: [], size: 0 }
  );

  const folderDB = await Cloud.create({
    userId,
    type: "folder",
    name: parentFolderName,
    size: folderData.size,
  }).then((val) => val.get({ plain: true }));
  await Promise.all(
    folderData.fileId.map(async (id) => {
      await Folder_Cloud.build({
        folderId: folderDB.id,
        cloudId: id,
      }).save();
    })
  );
  return { fileId: folderDB.id, size: folderData.size };
};

function moveStruct(
  folder: Folder<cloud>,
  userId: number
): Promise<resvalue | undefined>[] {
  return folder.files.map(async (file) => {
    const folder = file as Folder<cloud>;
    if (folder["folderName"]) {
      const files = await Promise.all(moveStruct(folder, userId));
      return await save(files, folder.folderName, userId);
    }

    const _file = file as cloud;
    return { fileId: _file.id, size: _file.size };
  });
}

const saveFolder: save_folder = async (folder, userId) => {
  const files = await Promise.all(moveStruct(folder, userId));
  await save(files, folder.folderName, userId);
};

export default saveFolder;
