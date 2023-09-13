import Flex from "./Flex";
import OneUploadingFile, { oneUploadingFile } from "./OneUploadingFile";
import Title from "./Title";

import Wrapper from "./Wrapper";

type uploadingFiles = {
  files: oneUploadingFile[];
  onClick?: (id: number) => void;
};

const UploadingFiles: React.FC<uploadingFiles> = (props) => {
  const { files, onClick } = props;
  const arr = files.map(({ fileName, value, load }, i) => (
    <OneUploadingFile
      key={i}
      value={value}
      fileName={fileName}
      onClick={() => onClick?.(i)}
      load={load}
    />
  ));

  return (
    <Wrapper
      overflowY="scroll"
      overflowX="hidden"
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
