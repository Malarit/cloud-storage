import { observer } from "mobx-react-lite";
import ModalSmall from "../../components/ModalSmall";
import files from "../../store/files";

const ModalNewFolderContainer: React.FC = observer(() => {
  const onCLickSave = (value: string) => {
    files.removeActiveModals();
  };

  const onClickCancel = () => {
    files.removeActiveModals();
  };

  return (
    <ModalSmall
      title="Новая папка"
      inputValue="Новая папка"
      buttonLeftText="Отмена"
      buttonRightText="Сохранить"
      onClickSave={onCLickSave}
      onClickCancel={onClickCancel}
    />
  );
});

export default ModalNewFolderContainer;
