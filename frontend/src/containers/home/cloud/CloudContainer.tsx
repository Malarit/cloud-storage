import { useSearchParams } from "react-router-dom";
import { cloud_query } from "../../../hooks/queries";
import CloudGeneralContainer from "../../cloud/CloudGeneralContainer";
import Cloud from "../../../components/Cloud";
import { observer } from "mobx-react-lite";
import files from "../../../store/files";

type cloud = React.ComponentProps<typeof Cloud>;
type files = cloud["files"];

const CloudContainer: React.FC = observer(() => {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter") || undefined;
  const { data } = cloud_query(
    { filter, folderId: files.getLastFolderPath() },
    {
      refetchOnWindowFocus: false,
    }
  );

  if (!data) return <></>;

  const fileList = data.map((file) => ({
    ...file,
    date: new Date(file.updatedAt).toLocaleDateString(),
  }));

  const onDoubleClick = (file: files[number]) => {
    if (file.type !== "folder") return

    if (file.id < 0) {
      files.removeLastFolderPath()
      return;
    }
    files.addFolderPath(file.id);
  };

  return (
    <CloudGeneralContainer
      activeRecent={Boolean(files.folderPath.length)}
      onDoubleClick={onDoubleClick}
      fileList={fileList}
    />
  );
});

export default CloudContainer;
