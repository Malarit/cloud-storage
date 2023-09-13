import { AxiosProgressEvent } from "axios";
import { cloud_mutation } from "./queries";
import files from "../store/files";
import { container } from "../utils/scanFile/types";
import Folder from "../utils/scanFile/Folder";
import useQueryFiles from "./useQueryFiles";

const useUploadFiles = () => {
  const controller = new AbortController();

  const { refetch } = useQueryFiles.query({
    enabled: false,
    refetchOnWindowFocus: false,
  });
  const mutation = cloud_mutation({
    onSuccess: () => {
      refetch();
    },
  });
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
        controller,
      });
      mutation.mutate({
        data: container.getStruct(),
        onUploadProgress,
        indexFile,
        signal: controller.signal,
      });
      return;
    }
    const indexFile = files.setUploadFile({
      fileName: container.name,
      value: 0,
      controller,
    });
    mutation.mutate({ data: container as File, onUploadProgress, indexFile });
  };

  return onUpload;
};

export default useUploadFiles;
