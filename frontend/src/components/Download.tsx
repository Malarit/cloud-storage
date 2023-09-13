import React from "react";
import styled from "styled-components";

type download = {
  link: string;
  fileName: string;
  onClick?: () => void;
};

const Link = styled.a`
  display: none;
`;

const Download: React.FC<download> = (props) => {
  const flag = React.useRef<boolean>(true);
  const ref = React.useRef<HTMLAnchorElement>(null);
  const { link, onClick, fileName } = props;

  React.useEffect(() => {
    if (flag.current) ref.current?.click();
    flag.current = false;
  }, []);

  const onClickHandle = () => {
    setTimeout(() => onClick?.(), 100);
  };

  return <Link onClick={onClickHandle} href={link} ref={ref} download={fileName} />;
};

export default Download;
