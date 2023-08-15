import { observer } from "mobx-react-lite";
import ModalSmall from "../../components/ModalSmall";
import files from "../../store/files";

const ModalRecoverFile: React.FC = observer(() => {
  const onCLickSave = (value: string) => {
    files.removeActiveModals();
  };

  const onClickCancel = () => {
    files.removeActiveModals();
  };

  return (
    <ModalSmall
    disableInput
      title="Восстановление"
      inputValue="Восстановить файл?"
      buttonLeftText="Отмена"
      buttonRightText="Восстановить"
      onClickSave={onCLickSave}
      onClickCancel={onClickCancel}
    />
  );
});

export default ModalRecoverFile;
