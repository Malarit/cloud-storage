import DropFilesPage from "../../components/DropFilesPage";
import { cloud_mutation } from "../../hooks/queries";
import { fileContainer } from "../../utils/scanFiles";

type DropFilesPageContainer = {
  children?: React.ReactNode;
};

const DropFilesPageContainer: React.FC<DropFilesPageContainer> = (props) => {
  const mutation = cloud_mutation();
  const onDropFiles = (container: fileContainer) => {
    // mutation.mutate(container);
    // console.log(container);
  };

  return <DropFilesPage onDropFiles={onDropFiles} {...props} />;
};

export default DropFilesPageContainer;
