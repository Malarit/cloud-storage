import Cloud from "../../../components/Cloud";
import CloudGeneralContainer, {
  trackPopupList,
  popupActions,
} from "../../cloud/CloudGeneralContainer";
import recent from "../../../assets/menu/recent white.svg";
import files from "../../../store/files";
import { observer } from "mobx-react-lite";

type file = React.ComponentProps<typeof Cloud>["files"];

type list = (typeof trackPopupList)[number];
type trackPopupListNames = Exclude<list["name"], "download"> | "recover";
type listPopupNewNamesType = Omit<list, "name"> & { name: trackPopupListNames };

const fileList: file = [
  {
    id: 0,
    type: "folder",
    name: "asd",
    date: "10.11.2023",
    size: "15MB",
  },
  {
    id: 1,
    type: "folder",
    name: "asd",
    date: "10.11.2023",
    size: "15MB",
  },
  {
    id: 2,
    type: "folder",
    name: "asd",
    date: "10.11.2023",
    size: "15MB",
  },
  {
    id: 3,
    type: "file",
    name: "file.js",
    date: "10.11.2023",
    size: "15MB",
  },
  {
    id: 4,
    type: "file",
    name: "file.js",
    date: "10.11.2023",
    size: "15MB",
  },
  {
    id: 5,
    type: "file",
    name: "file.js",
    date: "10.11.2023",
    size: "15MB",
  },
];

const transPopupActions: { [key in trackPopupListNames]: any } = (() => {
  const { download, ...nextKeys } = popupActions;
  const newObj = {
    ...nextKeys,
    recover: () => files.setActiveModal("recover"),
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
  const onClickPopup = (name: trackPopupListNames, fileId: file[number]) => {
    files.setActiveFile(fileId);
    transPopupActions[name]();
  };

  return (
    <CloudGeneralContainer
      fileList={fileList}
      popupList={trashPopupList}
      onClickPopupFn={(name, file) =>
        onClickPopup(name as trackPopupListNames, file)
      }
    />
  );
});

export default CloudContainerTrash;
