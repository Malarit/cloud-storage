import React from "react";
import { useSearchParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Cloud from "../../components/Cloud";
import files from "../../store/files";

import menu from "../../assets/menu/menu white.svg";
import pen from "../../assets/menu/pen white.svg";
import download from "../../assets/menu/download white.svg";
import deleteIcon from "../../assets/menu/delete white.svg";
import image from "../../assets/menu/image white.svg";
import folder from "../../assets/menu/create folder white.svg";
import documets from "../../assets/menu/documents white.svg";
import CloudFile from "../../components/CloudFile";

export type filterNames = "folder" | "image" | "application" | "all files";
type trackPopupListNames = "pen" | "download" | "delete" | "menu";

type cloud = React.ComponentProps<typeof Cloud>;
type files = cloud["files"];

type filter = cloud["filters"][number][number];
type filterNewTypeKey = Omit<filter, "key"> & { key: filterNames };

type cloudFileType = React.ComponentProps<typeof CloudFile>;
type list = cloudFileType["trackPopup"]["list"][number];
type listNewNamesType = Omit<list, "name"> & { name: trackPopupListNames };

type cloudGeneralContainer = {
  fileList: files;
  popupList?: list[];
  onClickPopupFn?: (value: string, file: files[number]) => void;
  onDoubleClick?: (file: files[number]) => void;
  activeRecent?: boolean;
  onDragFile?: (files: { firstFile: cloudFileType; secondFile: cloudFileType }) => {}
};

const filterListFiles: filterNewTypeKey[] = [
  {
    text: "Папки",
    icon: folder,
    key: "folder",
    setActive: false,
  },
  {
    text: "Изображения",
    icon: image,
    key: "image",
    setActive: false,
  },
  {
    text: "Документы",
    icon: documets,
    key: "application",
    setActive: false,
  },
  {
    text: "Все файлы",
    icon: documets,
    key: "all files",
    setActive: true,
  },
];

const filters = [filterListFiles];

export const popupActions: { [key in trackPopupListNames]: any } = {
  pen: () => files.setActiveModal("update name"),
  download: undefined,
  delete: () => files.setActiveModal("delete"),
  menu: undefined,
};

export const trackPopupList: listNewNamesType[] = [
  {
    icon: pen,
    primary: false,
    name: "pen",
  },
  {
    icon: download,
    primary: false,
    name: "download",
  },
  {
    icon: menu,
    primary: true,
    name: "menu",
  },
  {
    icon: deleteIcon,
    primary: false,
    name: "delete",
  },
];

const CloudGeneralContainer: React.FC<cloudGeneralContainer> = observer(
  (props) => {
    const { fileList, popupList, onClickPopupFn, onDoubleClick, activeRecent } =
      props;
    const [_, setSearchParams] = useSearchParams();
    const onClickPopup = (name: trackPopupListNames, file: files[number]) => {
      files.setActiveFile(file);
      popupActions[name]();
    };

    const onClickFilter = (name: filterNames) => {
      setSearchParams({ filter: name });
    };
    const onClickArrow = () => {};

    return (
      <Cloud
        files={fileList}
        filters={filters}
        onClickArrow={onClickArrow}
        activeRecent={activeRecent}
        onDoubleClick={onDoubleClick}
        onDragFile={(files) => {}}
        popupList={popupList || trackPopupList}
        onClickFilter={(value) => onClickFilter?.(value as filterNames)}
        onClickPopup={(value, file) =>
          onClickPopupFn
            ? onClickPopupFn(value, file)
            : onClickPopup(value as trackPopupListNames, file)
        }
      />
    );
  }
);

export default CloudGeneralContainer;
