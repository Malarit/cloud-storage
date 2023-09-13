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

type onDragType = (
  e: React.DragEvent<HTMLDivElement>,
  props: cloudFile
) => void;

type trackPopup = React.ComponentProps<typeof TrackPopup>;

type cloudFile = {
  type: "folder" | "file";
  name: string;
  date: string;
  size: string;
  id: number;
  onDragStart?: onDragType;
  onDrop?: onDragType;
  onClick?: () => void;
  onDoubleClick?: () => void;
  active?: boolean;
  trackPopup: trackPopup;
  setIcon?: string;
  disableTrack?: boolean;
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
  const {
    type,
    name,
    date,
    size,
    onDragStart,
    onClick,
    onDrop,
    active,
    trackPopup,
    onDoubleClick,
    setIcon,
    disableTrack,
  } = props;
  const ref = React.useRef<HTMLDivElement>(null);

  const onDragStartHandler: onDragType = (e, props) => {
    e.dataTransfer.setDragImage(new Image(), 0, 0);
    onDragStart?.(e, props);
  };

  const onDragOver: onDragType = (e, props) => {
    if (props.type === "folder")
      e.currentTarget.style.border = `1px solid ${theme.colors.blue}`;
  };

  const onDropHandler: onDragType = (e, props) => {
    e.preventDefault();
    e.currentTarget.style.border = `none`;
    onDrop?.(e, props);

 
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.border = `none`;
  };

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <CloudWrapper
      onDragEnter={onDragEnter}
      onDragStart={(e) => onDragStartHandler(e, props)}
      onDragOver={(e) => onDragOver(e, props)}
      onDrop={(e) => onDropHandler(e, props)}
      onDoubleClick={onDoubleClick}
      onDragLeave={onDragLeave}
      onClick={onClick}
      active={active}
      padding="0.2em 0.5em"
      minWidth="100%"
      height="3em"
      width="auto"
      draggable
      ref={ref}
    >
      <CloudGrid
        align="center"
        height="100%"
        templateColumns="minmax(150px, 1fr) minmax(5em, 20%) minmax(2em, 10%) 10em"
      >
        <Flex height="max-content" width="100%">
          <Icon src={setIcon ? setIcon : type === "folder" ? folder : file} />
          <CloudTitle
            width="100%"
            maxWidth="100%"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {name}
          </CloudTitle>
        </Flex>
        <CloudTitle>{date}</CloudTitle>
        <CloudTitle>{size}</CloudTitle>
        {!disableTrack && <TrackPopup {...trackPopup} />}
      </CloudGrid>
    </CloudWrapper>
  );
};

export default CloudFile;
