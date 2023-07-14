import Flex from "./Flex";
import OneUploadingFile, { oneUploadingFile } from "./OneUploadingFile";
import Title from "./Title";

import Wrapper from "./Wrapper";

type uploadingFiles = {
  files: oneUploadingFile[];
};

const UploadingFiles: React.FC<uploadingFiles> = (props) => {
  const { files } = props;
  const arr = files.map(({ fileName, value }, i) => (
    <OneUploadingFile fileName={fileName} value={value} key={i} />
  ));

  return (
    <Wrapper
      overflow="scroll"
      maxHeight="100%"
      width="100%"
      position="absolute"
      bottom="0"
    >
      <Flex height="max-content" direction="column" color="#fff">
        <Title>Всего файлов {files.length}</Title>
        {arr}
      </Flex>
    </Wrapper>
  );
};

export default UploadingFiles;
