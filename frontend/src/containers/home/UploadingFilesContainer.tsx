import { observer } from "mobx-react-lite";
import UploadingFiles from "../../components/UploadingFiles";
import files from "../../store/files";

const UploadingFilesContainer: React.FC = observer(() => {
  return (
    <>
      {files.uploadFiles.length && (
        <UploadingFiles
          onClick={(i) => files.removeUploadFile(i)}
          files={files.uploadFiles}
        />
      )}
    </>
  );
});

export default UploadingFilesContainer;
