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
  borderRadius?: string;
  zIndex?: number;
  border?: string;
  position?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  overflow?: string;
  
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
  border-radius: ${({ borderRadius }) => borderRadius};
  z-index: ${({ zIndex }) => zIndex};
  border: ${({ border }) => border};
  position: ${({ position }) => position};
  left: ${({ left }) => left};
  top: ${({ top }) => top};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  overflow: ${({ overflow }) => overflow};
`;

export default Wrapper;
