import CloudFile from "./CloudFile";
import Filter from "./Filter";
import Wrapper from "./Wrapper";
import HeadersCloudFile from "./HeadersCloudFile";
import file from "../assets/menu/file white.svg";

import React from "react";

type filterButtons = React.ComponentProps<typeof Filter>["list"];

type cloudFileType = React.ComponentProps<typeof CloudFile>;
type list = cloudFileType["trackPopup"]["list"][number];
type file = Omit<cloudFileType, "trackPopup">;

type cloud = {
  files: file[];
  popupList: list[];
  filters: filterButtons[];
  onClickFilter?: (name: string) => void;
  onClickPopup?: (name: string, fileId: number) => void;
  onClickArrow?: (name: string) => void;
};

const Cloud: React.FC<cloud> = (props) => {
  const {
    files,
    onClickPopup,
    onClickFilter,
    onClickArrow,
    popupList,
    filters,
  } = props;
  const refFiles = React.useRef<HTMLDivElement>(null);

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
        {files.map((file) => (
          <CloudFile
            trackPopup={{
              list: popupList,
              onClick: (name) => onClickPopup?.(name, file.id),
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
