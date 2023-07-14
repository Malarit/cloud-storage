import styled from "styled-components";
import Button, { button } from "./Button";
import Title from "./Title";
import Flex, { flex } from "./Flex";

type icon = {
  widthIcon?: string;
  heightIcon?: string;
  marginIcon?: string;
  paddingIcon?: string;
};

type buttonWithIcon = {
  text: string;
  icon: string;
};

const StyledIcon = styled.img<icon>`
  max-width: 100%;
  width: ${({ width }) => width || "1.5em"};
  height: ${({ height }) => height || " 2em"};
  margin: ${({ marginIcon }) => marginIcon};
`;

const ButtonWithIcon: React.FC<buttonWithIcon & button & icon> = (props) => {
  const {
    text,
    icon,
    widthIcon,
    heightIcon,
    marginIcon,
    paddingIcon,
    ...anyProps
  } = props;

  return (
    <Button {...anyProps}>
      <Flex padding={paddingIcon} align="center">
        <StyledIcon
          widthIcon={widthIcon}
          heightIcon={heightIcon}
          marginIcon={marginIcon}
          src={icon}
        />
        <Title width="100%">{text}</Title>
      </Flex>
    </Button>
  );
};

export default ButtonWithIcon;
