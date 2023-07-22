import Cloud from "../../../components/Cloud";
import CloudGeneralContainer from "../../Cloud/CloudGeneralContainer";

type file = React.ComponentProps<typeof Cloud>["files"];
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

const CloudContainer: React.FC = () => {
  return <CloudGeneralContainer fileList={fileList} />;
};

export default CloudContainer;
