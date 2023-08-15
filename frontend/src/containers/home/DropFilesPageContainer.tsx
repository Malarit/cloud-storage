import { observer } from "mobx-react-lite";
import DropFilesPage from "../../components/DropFilesPage";
import useUploadFiles from "../../hooks/useUploadFiles";

type DropFilesPageContainer = {
  children?: React.ReactNode;
};

const DropFilesPageContainer: React.FC<DropFilesPageContainer> = observer(
  (props) => {
    const onUpload = useUploadFiles();
    return <DropFilesPage onDropFiles={onUpload} {...props} />;
  }
);

export default DropFilesPageContainer;
