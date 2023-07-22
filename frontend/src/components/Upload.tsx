import React, { useImperativeHandle } from "react";
import styled from "styled-components";

type upload = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  webkitdirectory?: boolean;
};

const StyledUpload = styled.input`
  display: none;
`;

const Upload = React.forwardRef<HTMLInputElement, upload>((props, ref) => {
  const { onChange, webkitdirectory } = props;
  const refInput = React.useRef<HTMLInputElement>(null);
  const refFalag = React.useRef<boolean>(true);

  useImperativeHandle(ref, () => refInput.current as HTMLInputElement);

  React.useEffect(() => {
    if (refFalag.current) {
      webkitdirectory &&
        ["webkitdirectory", "directory", "mozdirectory"].forEach((attr) => {
          refInput.current?.setAttribute(attr, "");
        });
    }
    refFalag.current = false;
  }, []);

  return <StyledUpload type="file" onChange={onChange} ref={refInput} />;
});

export default Upload;
