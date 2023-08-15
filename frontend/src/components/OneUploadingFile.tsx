import styled from "styled-components";
import { theme } from "../Theme";

import Button from "./Button";
import CircleProgress from "./CircleProgress";
import Flex from "./Flex";
import Title from "./Title";

export type oneUploadingFile = {
  fileName: string;
  value: number;
  onClick?: () => void;
};

const RotateTitle = styled(Title)`
  transform: rotate(45deg);
  transition: all 0.5s ease;
`;

const OneUploadingFile: React.FC<oneUploadingFile> = (props) => {
  const { fileName, value, onClick } = props;
  return (
    <Flex justify="space-between" align="center" height="3em">
      <CircleProgress
        value={value}
        size={"1.5em"}
        strokeWidth={".12em"}
        color={theme.colors.blue}
        colorShadow={"#ffffff"}
      />
      <Title textOverflow="ellipsis" maxWidth="50%" overflow="hidden">
        {fileName}
      </Title>
      <Button onClick={onClick} bgColor="transparent">
        <RotateTitle fontSize="medium">+</RotateTitle>
      </Button>
    </Flex>
  );
};

export default OneUploadingFile;
