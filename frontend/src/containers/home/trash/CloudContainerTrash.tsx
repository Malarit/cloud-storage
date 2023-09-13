import Cloud from "../../../components/Cloud";
import CloudGeneralContainer, {
  trackPopupList,
  popupActions,
} from "../../cloud/CloudGeneralContainer";
import recent from "../../../assets/menu/recent white.svg";
import files from "../../../store/files";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";
import useQueryFiles from "../../../hooks/useQueryFiles";
import React from "react";
import config from "../../../../config";
import { get } from "../../../services/requests/types";

type file = React.ComponentProps<typeof Cloud>["files"];

type list = (typeof trackPopupList)[number];
type trackPopupListNames = Exclude<list["name"], "download"> | "recover";
type listPopupNewNamesType = Omit<list, "name"> & { name: trackPopupListNames };

const transPopupActions: { [key in trackPopupListNames]: any } = (() => {
  const { download, ...nextKeys } = popupActions;

  const newObj = {
    ...nextKeys,
    recover: () => files.setActiveModal("recover"),
    delete: () => files.setActiveModal("delete trash"),
  };
  return newObj;
})();

const trashPopupList: listPopupNewNamesType[] = trackPopupList.map((item) => {
  if (item.name === "download")
    return {
      icon: recent,
      primary: false,
      name: "recover",
    };
  return item;
}) as listPopupNewNamesType[];

const CloudContainerTrash: React.FC = observer(() => {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter") || undefined;

  const { data, fetchNextPage, hasNextPage, isFetching } =
    useQueryFiles.setParamsAndQuery(filter, undefined, true, config.LIMIT);

  const filePages = data?.pages.reduce<get["cloud"]["files"]>((prev, curr) => {
    return [...prev, ...curr.files];
  }, []);

  const fileList =
    filePages?.map((file) => ({
      ...file,
      date: new Date(file.updatedAt).toLocaleDateString(),
    })) || (data as file);

  const onClickPopup = (
    name: trackPopupListNames,
    fileId: NonNullable<file>[number]
  ) => {
    files.setActiveFile(fileId);
    transPopupActions[name]();
  };

  return (
    <CloudGeneralContainer
      onDownScrolled={() => hasNextPage && !isFetching && fetchNextPage()}
      fileList={fileList}
      popupList={trashPopupList}
      onClickPopupFn={(name, file) =>
        onClickPopup(name as trackPopupListNames, file)
      }
    />
  );
});

export default CloudContainerTrash;
