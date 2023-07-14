import DropFilesPage from "../../components/DropFilesPage";
import { fileContainer } from "../../utils/scanFiles";

type DropFilesPageContainer = {
  children?: React.ReactNode;
};

const DropFilesPageContainer: React.FC<DropFilesPageContainer> = (props) => {
  const onDropFiles = (container: fileContainer) => {
    console.log(container);
  };

  return <DropFilesPage onDropFiles={onDropFiles} {...props} />;
};

export default DropFilesPageContainer;
