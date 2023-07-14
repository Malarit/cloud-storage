import { oneUploadingFile } from "../../components/OneUploadingFile";
import UploadingFiles from "../../components/UploadingFiles";

const UploadingFilesContainer: React.FC = () => {
  const files: oneUploadingFile[] = [{ fileName: "string.png", value: 20 }];

  return <>{files.length && <UploadingFiles files={files} />}</>;
};

export default UploadingFilesContainer;
