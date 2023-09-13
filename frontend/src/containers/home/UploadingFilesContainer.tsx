import { observer } from "mobx-react-lite";
import UploadingFiles from "../../components/UploadingFiles";
import files from "../../store/files";

const UploadingFilesContainer: React.FC = observer(() => {
  const onClick = (i: number) => {
    files.removeUploadFile(i);
  };

  return (
    <>
      {files.uploadFiles.length && (
        <UploadingFiles onClick={onClick} files={files.uploadFiles} />
      )}
    </>
  );
});

export default UploadingFilesContainer;
