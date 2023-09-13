import { observer } from "mobx-react-lite";
import Download from "../../components/Download";
import files from "../../store/files";
import React from "react";
import { download_query } from "../../hooks/queries";

const DownloadContainer: React.FC = observer(() => {
  const activeFile = files.activeFile;
  const lastIndex = files.uploadFiles.length - 1;
  if (!activeFile) return <></>;

  const signal = files.uploadFiles[lastIndex]?.controller?.signal;

  const { data } = download_query(
    { id: signal ? activeFile.id : -1 },
    lastIndex,
    undefined,
    signal,
    {
      refetchOnMount: true,
    }
  );
  if (!data) return <></>;

  const link = URL.createObjectURL(data);

  const onClick = () => {
    files.removeActiveFile();
    files.removeActiveModals();
    files.removeUploadFile(lastIndex);
  };

  return <Download fileName={activeFile.name} onClick={onClick} link={link} />;
});

export default DownloadContainer;
