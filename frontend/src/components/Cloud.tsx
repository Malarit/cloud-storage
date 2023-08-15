import React from "react";

import CloudFile from "./CloudFile";
import Filter from "./Filter";
import Wrapper from "./Wrapper";
import HeadersCloudFile from "./HeadersCloudFile";

import recent from "../assets/menu/recent white.svg";

type filterButtons = React.ComponentProps<typeof Filter>["list"];

type cloudFileType = React.ComponentProps<typeof CloudFile>;
type list = cloudFileType["trackPopup"]["list"][number];
type file = Omit<cloudFileType, "trackPopup">;

type cloud = {
  files: file[];
  popupList: list[];
  filters: filterButtons[];
  activeRecent?: boolean;
  onClickFilter?: (name: string) => void;
  onClickPopup?: (name: string, file: file) => void;
  onClickArrow?: (name: string) => void;
  onDoubleClick?: (file: file) => void;
  onDragFile?: (files: { firstFile: cloudFileType; secondFile: cloudFileType }) => void;
};

const Cloud: React.FC<cloud> = (props) => {
  const {
    files,
    onClickPopup,
    onClickFilter,
    onClickArrow,
    onDoubleClick,
    onDragFile,
    popupList,
    filters,
    activeRecent,
  } = props;
  const refFiles = React.useRef<HTMLDivElement>(null);

  const getRecent = () => {
    const recentFile: file = {
      id: -1,
      type: "folder",
      setIcon: recent,
      name: "...",
      date: "",
      size: "",
    };

    return (
      <CloudFile
        onDoubleClick={() => onDoubleClick?.(recentFile)}
        trackPopup={{
          list: [],
          onClick: () => {},
        }}
        {...recentFile}
        key={"asd"}
        disableTrack
      />
    );
  };

  return (
    <>
      {filters.map((filter, i) => (
        <Filter key={i} onClick={(key) => onClickFilter?.(key)} list={filter} />
      ))}
      <Wrapper margin="1em 0 0 0">
        <HeadersCloudFile onClick={onClickArrow} />
      </Wrapper>
      <Wrapper
        ref={refFiles}
        overflowY="scroll"
        height="100%"
        maxHeight={`calc(100vh - ${refFiles.current?.offsetTop}px)`}
      >
        {activeRecent && getRecent()}
        {files.map((file) => (
          <CloudFile
            onDragFile={onDragFile}
            onDoubleClick={() => onDoubleClick?.(file)}
            trackPopup={{
              list: popupList,
              onClick: (name) => onClickPopup?.(name, file),
            }}
            key={file.id}
            {...file}
          />
        ))}
      </Wrapper>
    </>
  );
};

export default Cloud;
