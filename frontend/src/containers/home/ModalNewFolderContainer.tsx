import { observer } from "mobx-react-lite";
import ModalSmall from "../../components/ModalSmall";
import files from "../../store/files";
import useUploadFiles from "../../hooks/useUploadFiles";
import Folder from "../../utils/scanFile/Folder";

const ModalNewFolderContainer: React.FC = observer(() => {
  const onUpload = useUploadFiles();
  const onCLickSave = (value: string) => {
    const folder = new Folder(value);
    onUpload(folder);
    files.removeActiveModals();
  };

  const onClickCancel = () => {
    files.removeActiveModals();
    files.removeActiveFile();
  };

  return (
    <ModalSmall
      title="Новая папка"
      inputValue="Новая папка"
      buttonLeftText="Отмена"
      buttonRightText="Сохранить"
      onClickRight={onCLickSave}
      onClickLeft={onClickCancel}
    />
  );
});

export default ModalNewFolderContainer;
