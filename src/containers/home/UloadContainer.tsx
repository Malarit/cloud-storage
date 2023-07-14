import { observer } from "mobx-react-lite";
import Upload from "../../components/Upload";
import files from "../../store/files";
import React from "react";

const UploadContainer: React.FC = observer(() => {
  const refInputFiles = React.useRef<HTMLInputElement>(null);
  const refInputFolder = React.useRef<HTMLInputElement>(null);

  const resetInputs = () => {
    refInputFiles.current && (refInputFiles.current.value = "");
    refInputFolder.current && (refInputFolder.current.value = "");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const container = [];
    const filesInput = e.target.files;
    if (!filesInput) return;
    for (const file of filesInput) {
      container.push(file);
    }
    console.log(container);
    files.removeActiveModals();
    resetInputs();
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
