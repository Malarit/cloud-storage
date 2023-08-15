import { observer } from "mobx-react-lite";
import Upload from "../../components/Upload";
import files from "../../store/files";
import React from "react";
import parseFiles from "../../utils/scanFile/parseFiles";
import useUploadFiles from "../../hooks/useUploadFiles";
import Folder from "../../utils/scanFile/Folder";

const UploadContainer: React.FC = observer(() => {
  const refInputFiles = React.useRef<HTMLInputElement>(null);
  const refInputFolder = React.useRef<HTMLInputElement>(null);
  const onUpload = useUploadFiles();

  const resetInputs = () => {
    refInputFiles.current && (refInputFiles.current.value = "");
    refInputFolder.current && (refInputFolder.current.value = "");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    files.removeActiveModals();
    
    const filesInput = e.target.files;
    if (!filesInput) return;

    const file = parseFiles(Object.values(filesInput));
    resetInputs();

    if (file instanceof Folder) {
      onUpload(file)
      return
    }
    file.map((file) => onUpload(file))
  };

  React.useEffect(() => {
    switch (files.activeModal) {
      case "upload file":
        refInputFiles.current?.click();
        break;
      case "upload folder":
        refInputFolder.current?.click();
        break;
    }
  }, [files.activeModal]);

  return (
    <>
      <Upload ref={refInputFiles} onChange={onChange} />
      <Upload ref={refInputFolder} webkitdirectory onChange={onChange} />
    </>
  );
});

export default UploadContainer;
