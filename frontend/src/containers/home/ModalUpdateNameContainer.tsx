import { observer } from "mobx-react-lite";
import ModalSmall from "../../components/ModalSmall";
import files from "../../store/files";
import { update_name } from "../../hooks/queries";
import useQueryFiles from "../../hooks/useQueryFiles";

const ModalUpdateNameContainer: React.FC = observer(() => {
  const { refetch } = useQueryFiles.query();
  const update_name_mutation = update_name({
    onSuccess() {
      refetch();
    },
  });
  
  const onClickRight = (value: string) => {
    const file = files.activeFile;
    if (!file) return;

    update_name_mutation.mutate({ id: file.id, name: value });

    files.removeActiveModals();
    files.removeActiveFile();
  };

  const onClickLeft = () => {
    files.removeActiveModals();
    files.removeActiveFile();
  };

  return (
    <ModalSmall
      title="Переименовать"
      inputValue={files.activeFile?.name}
      buttonLeftText="Отмена"
      buttonRightText="Сохранить"
      onClickRight={onClickRight}
      onClickLeft={onClickLeft}
    />
  );
});

export default ModalUpdateNameContainer;
