import { observer } from "mobx-react-lite";
import ModalSmall from "../../components/ModalSmall";
import files from "../../store/files";
import { recover_file } from "../../hooks/queries";
import useQueryFiles from "../../hooks/useQueryFiles";

const ModalRecoverFile: React.FC = observer(() => {
  const { refetch } = useQueryFiles.query({ enabled: false });
  const recover_file_mutation = recover_file({
    onSuccess() {
      refetch();
    },
  });
  
  const onCLickSave = () => {
    const file = files.activeFile;
    if (!file) return;

    recover_file_mutation.mutate({ id: file.id });

    files.removeActiveFile();
    files.removeActiveModals();
  };

  const onClickCancel = () => {
    files.removeActiveModals();
    files.removeActiveFile();
  };

  return (
    <ModalSmall
      disableInput
      title="Восстановление"
      inputValue="Восстановить файл?"
      buttonLeftText="Нет"
      buttonRightText="Восстановить"
      onClickRight={onCLickSave}
      onClickLeft={onClickCancel}
    />
  );
});

export default ModalRecoverFile;
