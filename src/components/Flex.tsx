import styled from "styled-components";

export type flex = {
  children?: React.ReactNode;
  direction?: string;
  align?: string;
  justify?: string;
  width?: string;
  height?: string;
  position?: string;
  margin?: string;
  padding?: string;
  color?: string;
  float?: string;
  overflow?: string;
  maxHeight?: string;
};

const Flex = styled.div<flex>`
  display: flex;
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "100%"};
  max-height: ${({ maxHeight }) => maxHeight};
  flex-direction: ${({ direction }) => direction};
  align-items: ${({ align }) => align};
  justify-content: ${({ justify }) => justify};
  position: ${({ position }) => position};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  color: ${({ color }) => color};
  overflow: ${({ overflow }) => overflow};
`;

export default Flex;
