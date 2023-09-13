import React from "react";

import CloudFile from "./CloudFile";
import Filter from "./Filter";
import Wrapper from "./Wrapper";
import HeadersCloudFile from "./HeadersCloudFile";

import recent from "../assets/menu/recent white.svg";
import Flex from "./Flex";
import Title from "./Title";
import Loading5 from "./loading5";
import { theme } from "../Theme";

type filterButtons = React.ComponentProps<typeof Filter>["list"];
type headersCloudFileType = React.ComponentProps<typeof HeadersCloudFile>;

type cloudFileType = React.ComponentProps<typeof CloudFile>;
type list = cloudFileType["trackPopup"]["list"][number];
type file = Omit<cloudFileType, "trackPopup">;

type cloud = {
  files?: file[];
  popupList: list[];
  filters: filterButtons[];
  activeRecent?: boolean;
  onClickFilter?: (name: string) => void;
  onClickPopup?: (name: string, file: file) => void;
  onClickArrow?: headersCloudFileType["onClick"];
  onDoubleClick?: (file: file) => void;
  onDragFile?: (files: { file: cloudFileType; folder: cloudFileType }) => void;
  onScrollFiles?: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
};

const Cloud: React.FC<cloud> = (props) => {
  const {
    files,
    onClickPopup,
    onClickFilter,
    onClickArrow,
    onDoubleClick,
    onDragFile,
    onScrollFiles,
    popupList,
    filters,
    activeRecent,
  } = props;
  const refFilesWrapper = React.useRef<HTMLDivElement>(null);
  const [dropItem, setDropItem] = React.useState<cloudFileType | null>(null);

  const onDragStart = (file: cloudFileType) => setDropItem(file);

  const onDrop = (file: cloudFileType) => {
    const check = dropItem && file.type === "folder" && dropItem.id !== file.id;
    if (check) {
      onDragFile?.({
        file: dropItem,
        folder: file,
      });
    }
  };

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
        onDragStart={(_, file) => onDragStart(file)}
        onDrop={(_, file) => onDrop(file)}
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

  const getFiles = () => {
    if (!files) {
      return (
        <Flex align="center" justify="center" height="70vh">
          <Loading5
            count={32}
            size="7em"
            sizeBlock="0.5em"
            color="#fff"
            colorActive={theme.colors.blue}
            delay={100}
            transition={0.5}
          />
        </Flex>
      );
    }

    if (files.length === 0) {
      return (
        <Flex align="center" justify="center" height="70vh">
          <Title fontSize="medium" color="#fff">
            Файлов.net
          </Title>
        </Flex>
      );
    }

    return (
      <Wrapper
        onScroll={onScrollFiles}
        ref={refFilesWrapper}
        overflowY="scroll"
        height="100%"
        maxHeight={`calc(100vh - ${refFilesWrapper.current?.offsetTop || 0}px)`}
      >
        {activeRecent && getRecent()}
        {files.map((file) => (
          <CloudFile
            onDragStart={(_, file) => onDragStart(file)}
            onDrop={(_, file) => onDrop(file)}
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
      {getFiles()}
    </>
  );
};

export default Cloud;
