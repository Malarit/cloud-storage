import { observer } from "mobx-react-lite";
import ModalNewFolder from "../../components/ModalNewFolder";
import files from "../../store/files";

const ModalNewFolderContainer: React.FC = observer(() => {
  const onCLickSave = (value: string) => {
    files.removeActiveModals();
  };

  const onClickCancel = () => {
    files.removeActiveModals();
  };

  return (
    <ModalNewFolder
      title="Новая папка"
      onClickSave={onCLickSave}
      onClickCancel={onClickCancel}
    />
  );
});

export default ModalNewFolderContainer;
