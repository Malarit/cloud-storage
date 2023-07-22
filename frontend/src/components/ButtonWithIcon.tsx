import styled from "styled-components";
import Button, { button } from "./Button";
import Title from "./Title";
import Flex from "./Flex";
import React from "react";

type icon = {
  widthIcon?: string;
  heightIcon?: string;
  marginIcon?: string;
  paddingIcon?: string;
};

type buttonWithIcon = {
  text: string;
  icon: string;
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const StyledIcon = styled.img<icon>`
  max-width: 100%;
  width: ${({ width }) => width || "1.5em"};
  height: ${({ height }) => height || " 2em"};
  margin: ${({ marginIcon }) => marginIcon};
`;

const ButtonWithIcon = React.forwardRef<
  HTMLButtonElement,
  buttonWithIcon & button & icon
>((props, ref) => {
  const {
    text,
    icon,
    widthIcon,
    heightIcon,
    marginIcon,
    paddingIcon,
    onMouseEnter,
    onMouseLeave,
    ...anyProps
  } = props;

  return (
    <Button
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      ref={ref}
      {...anyProps}
    >
      <Flex padding={paddingIcon} align="center">
        <StyledIcon
          onDragStart={(e) => e.preventDefault()}
          widthIcon={widthIcon}
          heightIcon={heightIcon}
          marginIcon={marginIcon}
          src={icon}
        />
        <Title width="100%">{text}</Title>
      </Flex>
    </Button>
  );
});

export default ButtonWithIcon;
