import CloudFile from "../../components/CloudFile";
import menu from "../../assets/menu/menu white.svg";
import pen from "../../assets/menu/pen white.svg";
import download from "../../assets/menu/download white.svg";
import deleteIcon from "../../assets/menu/delete white.svg";
import Filter from "../../components/Filter";

type cloudFileType = React.ComponentProps<typeof CloudFile>;
type filterButtons = React.ComponentProps<typeof Filter>["buttons"];

const trackPopupList = [
  {
    icon: pen,
    primary: false,
    name: "",
  },
  {
    icon: download,
    primary: false,
    name: "",
  },
  {
    icon: menu,
    primary: true,
    name: "",
  },
  {
    icon: deleteIcon,
    primary: false,
    name: "",
  },
];
const files: Omit<cloudFileType, "trackPopup">[] = [
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

const filterListButtons: filterButtons = [
  {
    text: "Название",
    popup: [
      { text: "png", icon: "", cbValue: "" },
      { text: "jpeg", icon: "", cbValue: "" },
    ],
    toggle: false,
  },
  {
    text: "Файл",
    popup: [
      { text: "Папка", icon: "", cbValue: "" },
      { text: "png", icon: "", cbValue: "" },
      { text: "jpeg", icon: "", cbValue: "" },
    ],
    toggle: false,
  },
  {
    text: "Дата",
    popup: [
      { text: "По возрастанию", icon: "", cbValue: "" },
      { text: "По убыванию", icon: "", cbValue: "" },
    ],
    toggle: false,
  },
  {
    text: "Размер файла",
    popup: [
      { text: "По возрастанию", icon: "", cbValue: "" },
      { text: "По убыванию", icon: "", cbValue: "" },
    ],
    toggle: false,
  },
];

const Cloud: React.FC = () => {
  const onCLickPopup = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {};

  return (
    <>
      <Filter buttons={filterListButtons} />
      {files.map((file) => (
        <CloudFile
          trackPopup={{
            list: trackPopupList,
            onClick: onCLickPopup,
          }}
          key={file.id}
          {...file}
        />
      ))}
    </>
  );
};

export default Cloud;
