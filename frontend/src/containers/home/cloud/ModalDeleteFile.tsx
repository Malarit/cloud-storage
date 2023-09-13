import { observer } from "mobx-react-lite";
import ModalSmall from "../../../components/ModalSmall";
import files from "../../../store/files";
import { delete_file } from "../../../hooks/queries";
import useQueryFiles from "../../../hooks/useQueryFiles";

const ModalDeleteFile: React.FC = observer(() => {
  const { refetch } = useQueryFiles.query({ enabled: false });
  const dlete_file_mutation = delete_file({
    onSuccess() {
      refetch();
    },
  });
  const onClickRight = () => {
    const file = files.activeFile;
    if (!file) return;
    dlete_file_mutation.mutate({ id: file.id });
    files.removeActiveModals();
  };

  const onClickLeft = () => {
    files.removeActiveModals();
    files.removeActiveFile();
  };

  return (
    <ModalSmall
      disableInput
      title="Удалить"
      inputValue="Перемесить файл в корзину?"
      buttonLeftText="Нет"
      buttonRightText="Да"
      onClickRight={onClickRight}
      onClickLeft={onClickLeft}
    />
  );
});

export default ModalDeleteFile;
