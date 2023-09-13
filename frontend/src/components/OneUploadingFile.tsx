import styled from "styled-components";
import { theme } from "../Theme";

import Button from "./Button";
import CircleProgress from "./CircleProgress";
import Flex from "./Flex";
import Title from "./Title";
import CircleLoad from "./CircleLoad";

export type oneUploadingFile = {
  fileName: string;
  value: number;
  onClick?: () => void;
  load?: boolean;
};

const RotateTitle = styled(Title)`
  transform: rotate(45deg);
  transition: all 0.5s ease;
`;

const OneUploadingFile: React.FC<oneUploadingFile> = (props) => {
  const { fileName, value, onClick, load } = props;
  const loadProps = {
    size: "1.5em",
    strokeWidth: ".12em",
    color: theme.colors.blue,
    colorShadow: "#ffffff",
  };
  const loadJSX = load ? (
    <CircleLoad {...loadProps} />
  ) : (
    <CircleProgress value={value} {...loadProps} />
  );

  return (
    <Flex justify="space-between" align="center" height="3em">
      {loadJSX}
      <Title
        textOverflow="ellipsis"
        textAlign="center"
        maxWidth="60%"
        overflow="hidden"
      >
        {fileName}
      </Title>
      <Button onClick={onClick} bgColor="transparent">
        <RotateTitle fontSize="medium">+</RotateTitle>
      </Button>
    </Flex>
  );
};

export default OneUploadingFile;
