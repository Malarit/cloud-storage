import styled from "styled-components";

type flex = {
  children?: React.ReactNode;
  direction?: string;
  align?: string;
  justify?: string;
  width?: string;
  height?: string;
};

const Flex = styled.div<flex>`
  display: flex;
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "100%"};
  flex-direction: ${({ direction }) => direction};
  align-items: ${({ align }) => align};
  justify-content: ${({ justify }) => justify};
`;

export default Flex;
