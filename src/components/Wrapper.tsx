import styled from "styled-components";

type wrapper = {
  children?: React.ReactNode;
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  minWidth?: string;
  minHeight?: string;
  margin?: string;
  padding?: string;
  bgColor?: string;
};

const Wrapper = styled.div<wrapper>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  max-width: ${({ maxWidth }) => maxWidth};
  max-height: ${({ maxHeight }) => maxHeight};
  min-width: ${({ minWidth }) => minWidth};
  min-height: ${({ minHeight }) => minHeight};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  background-color: ${({ bgColor }) => bgColor};
`;

export default Wrapper;
