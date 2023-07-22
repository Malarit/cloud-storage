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

type filterNames = "folder" | "images" | "documents" | "all files";
type trackPopupListNames = "pen" | "download" | "delete" | "menu";

type cloud = React.ComponentProps<typeof Cloud>;
type file = cloud["files"];

type filter = cloud["filters"][number][number];
type filterNewTypeKey = Omit<filter, "key"> & { key: filterNames };

type cloudFileType = React.ComponentProps<typeof CloudFile>;
type list = cloudFileType["trackPopup"]["list"][number];
type listNewNamesType = Omit<list, "name"> & { name: trackPopupListNames };

type cloudGeneralContainer = {
  fileList: file;
  popupList?: list[];
  onClickPopupFn?: (value: string, fileId: number) => void;
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
    key: "images",
    setActive: false,
  },
  {
    text: "Документы",
    icon: documets,
    key: "documents",
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
    const { fileList, popupList, onClickPopupFn } = props;

    const onClickPopup = (name: trackPopupListNames, fileId: number) => {
      files.setActiveFileId(fileId);
      popupActions[name]();
    };

    const onClickFilter = (name: filterNames) => {};
    const onClickArrow = () => {};

    return (
      <Cloud
        filters={filters}
        popupList={popupList || trackPopupList}
        files={fileList}
        onClickFilter={(value) => onClickFilter?.(value as filterNames)}
        onClickPopup={(value, id) =>
          onClickPopupFn
            ? onClickPopupFn?.(value, id)
            : onClickPopup(value as trackPopupListNames, id)
        }
        onClickArrow={onClickArrow}
      />
    );
  }
);

export default CloudGeneralContainer;
