import ModalSmall from "../../components/ModalSmall";
import files from "../../store/files";

const ModalDeleteFile: React.FC = () => {
  const onCLickSave = (value: string) => {
    files.removeActiveModals();
  };

  const onClickCancel = () => {
    files.removeActiveModals();
  };

  return (
    <ModalSmall
      title="Удалить"
      inputValue="Подтвердите удаление файла"
      buttonLeftText="Отмена"
      buttonRightText="Удалить"
      disableInput
      onClickSave={onCLickSave}
      onClickCancel={onClickCancel}
    />
  );
};

export default ModalDeleteFile;
