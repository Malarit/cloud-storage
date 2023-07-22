import styled from "styled-components";
import ButtonWithIcon from "./ButtonWithIcon";
import Flex from "./Flex";
import React from "react";

type list = {
  icon: string;
  primary: boolean;
  name: string;
};

type trackButton = {
  left: string;
  hide: boolean;
  zIndex?: number;
};

type trackPopup = {
  list: list[];
  onClick?: (
    name: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

const attrsTrackButton = ({ left }: trackButton) => ({
  style: {
    left,
  },
});

const TrackButton = styled(ButtonWithIcon).attrs<trackButton>(
  attrsTrackButton
)<trackButton>`
  background-color: transparent;
  position: absolute;
  z-index: ${({ zIndex }) => zIndex};
  transition: all 0.3s ease;

  ${({ hide }) =>
    hide &&
    `
      pointer-events: none;
      opacity: 0;
    `};

  & img {
    height: 1em;
  }
`;

const TrackPopup: React.FC<trackPopup> = (props) => {
  const { list, onClick } = props;
  const [active, setActive] = React.useState(false);
  const leftForElemments = 100 / list.length;
  const indexPrimary = list.findIndex(({ primary }) => primary);

  const leftElements = (i: number) =>
    active ? `${leftForElemments * i}%` : `${leftForElemments * indexPrimary}%`;

  const listButtons = list.map(({ icon, primary, name }, i) => (
    <TrackButton
      text=""
      key={i}
      icon={icon}
      name={name}
      onClick={(e) => onClick?.(name, e)}
      left={leftElements(i)}
      zIndex={primary ? 2 : 1}
      hide={primary ? false : !active}
      onMouseEnter={primary ? () => setActive(true) : undefined}
    />
  ));

  return (
    <Flex
      onMouseLeave={() => setActive(false)}
      position="relative"
      align="center"
      color="#fff"
      width="100%"
    >
      {listButtons}
    </Flex>
  );
};

export default TrackPopup;
