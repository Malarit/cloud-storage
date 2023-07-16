import styled from "styled-components";
import Flex from "./Flex";
import Title from "./Title";
import Wrapper from "./Wrapper";
import Grid from "./Grid";
import folder from "../assets/menu/create folder white.svg";
import file from "../assets/menu/file white.svg";
import React from "react";
import { theme } from "../Theme";
import TrackPopup from "./TrackPopup";

type trackPopup = React.ComponentProps<typeof TrackPopup>;

type cloudFile = {
  type: "folder" | "file";
  name: string;
  date: string;
  size: string;
  id: number;
  onDragFile?: (files: { firstFile: cloudFile; secondFile: cloudFile }) => void;
  onClick?: () => void;
  active?: boolean;
  trackPopup: trackPopup;
};

type cloudWrapper = {
  active?: boolean;
};

const CloudWrapper = styled(Wrapper)<cloudWrapper>`
  cursor: pointer;
  border-radius: ${({ theme }) => theme.border.radius};
  background-color: ${({ active }) => active && "rgba(255, 255, 255, 0.136)"};
  &:hover {
    background-color: rgba(255, 255, 255, 0.136);
  }
`;

const CloudTitle = styled(Title)`
  color: #fff;
`;

const Icon = styled.img`
  max-width: 100%;
  height: 1.5em;
  margin-right: 1em;
`;

const CloudGrid = styled(Grid)`
  & > div:not(:first-of-type) {
    text-align: center;
  }
`;

const CloudFile: React.FC<cloudFile> = (props) => {
  const { type, name, date, size, onDragFile, onClick, active, trackPopup } =
    props;
  const [dropItem, setDropItem] = React.useState<cloudFile>();

  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    props: cloudFile
  ) => {
    e.dataTransfer.setDragImage(new Image(), 0, 0);
    setDropItem(props);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>, props: cloudFile) => {
    if (props.type === "folder")
      e.currentTarget.style.border = `1px solid ${theme.colors.blue}`;
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, props: cloudFile) => {
    const check =
      dropItem && props.type === "folder" && dropItem.id !== props.id;
    e.preventDefault();
    e.currentTarget.style.border = `none`;
    if (check)
      onDragFile?.({
        firstFile: dropItem,
        secondFile: props,
      });
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) =>
    (e.currentTarget.style.border = `none`);

  return (
    <CloudWrapper
      active={active}
      onClick={onClick}
      onDragLeave={onDragLeave}
      onDragStart={(e) => onDragStart(e, props)}
      onDragOver={(e) => onDragOver(e, props)}
      onDrop={(e) => onDrop(e, props)}
      draggable
      padding="0.2em 0.5em"
      minWidth="100%"
      height="3em"
      width="auto"
    >
      <CloudGrid
        templateColumns="minmax(150px, 1fr) minmax(5em, 20%) minmax(2em, 10%) 10em"
        align="center"
        height="100%"
      >
        <Flex height="max-content" width="100%">
          <Icon src={type === "folder" ? folder : file} />
          <CloudTitle
            overflow="hidden"
            textOverflow="ellipsis"
            width="100%"
            maxWidth="100%"
          >
            {name}
          </CloudTitle>
        </Flex>
        <CloudTitle>{date}</CloudTitle>
        <CloudTitle>{size}</CloudTitle>
        <TrackPopup {...trackPopup} />
      </CloudGrid>
    </CloudWrapper>
  );
};

export default CloudFile;
