import { useSearchParams } from "react-router-dom";
import CloudGeneralContainer from "../../cloud/CloudGeneralContainer";
import Cloud from "../../../components/Cloud";
import { observer } from "mobx-react-lite";
import files from "../../../store/files";
import useQueryFiles from "../../../hooks/useQueryFiles";
import React from "react";
import config from "../../../../config";
import { get } from "../../../services/requests/types";

type cloud = React.ComponentProps<typeof Cloud>;
type files = cloud["files"];

const CloudContainer: React.FC = observer(() => {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter") || undefined;
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useQueryFiles.setParamsAndQuery(
      filter,
      files.getLastFolderPath(),
      undefined,
      config.LIMIT
    );
    
  const filePages = data?.pages.reduce<get["cloud"]["files"]>((prev, curr) => {
    return [...prev, ...curr.files];
  }, []);

  const fileList =
    filePages?.map((file) => ({
      ...file,
      date: new Date(file.updatedAt).toLocaleDateString(),
    })) || (data as files);

  const onDoubleClick = (file: NonNullable<files>[number]) => {
    if (file.type !== "folder") return;

    if (file.id < 0) {
      files.removeLastFolderPath();
      return;
    }
    files.addFolderPath(file.id);
  };

  return (
    <CloudGeneralContainer
      onDownScrolled={() => hasNextPage && !isFetching && fetchNextPage()}
      activeRecent={Boolean(files.folderPath.length)}
      onDoubleClick={onDoubleClick}
      fileList={fileList}
    />
  );
});

export default CloudContainer;
