import CloudFile from "../../components/CloudFile";

type cloudFileType = React.ComponentProps<typeof CloudFile>;

const Cloud: React.FC = () => {
  const files: cloudFileType[] = [
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

  return (
    <>
      {files.map((file) => (
        <CloudFile key={file.id} {...file} />
      ))}
    </>
  );
};

export default Cloud;
