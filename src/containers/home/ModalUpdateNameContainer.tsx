import { observer } from "mobx-react-lite";
import ModalSmall from "../../components/ModalSmall";
import files from "../../store/files";

const ModalUpdateNameContainer: React.FC = observer(() => {
  const onCLickSave = (value: string) => {
    files.removeActiveModals();
  };

  const onClickCancel = () => {
    files.removeActiveModals();
  };

  return (
    <ModalSmall
      title="Переименовать"
      inputValue="file name"
      buttonLeftText="Отмена"
      buttonRightText="Сохранить"
      onClickSave={onCLickSave}
      onClickCancel={onClickCancel}
    />
  );
});

export default ModalUpdateNameContainer;
