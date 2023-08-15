import { AxiosProgressEvent } from "axios";
import { cloud_mutation } from "./queries";
import files from "../store/files";
import { container } from "../utils/scanFile/types";
import Folder from "../utils/scanFile/Folder";

const useUploadFiles = () => {
  const mutation = cloud_mutation();
  const onUploadProgress = (
    e: AxiosProgressEvent,
    indexFile: number | undefined
  ) => {
    const progress = e.progress;
    if (indexFile === undefined || progress === undefined) return;
    files.updateProgressUploadFile(indexFile, Math.round(progress * 100));
  };

  const onUpload = (container: container) => {
    if (container instanceof Folder) {
      const indexFile = files.setUploadFile({
        fileName: container.folderName,
        value: 0,
      });
      mutation.mutate({
        data: container.getStruct(),
        onUploadProgress,
        indexFile,
      });
      return;
    }
    const indexFile = files.setUploadFile({
      fileName: container.name,
      value: 0,
    });
    mutation.mutate({ data: container as File, onUploadProgress, indexFile });
  };
  
  return onUpload;
};

export default useUploadFiles;
