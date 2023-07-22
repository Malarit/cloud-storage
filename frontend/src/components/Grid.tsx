import styled from "styled-components";

type grid = {
  children?: React.ReactNode;
  templateColumns?: string;
  align?: string;
  justify?: string;
  gap?: string;
  rowGap?: string;
  columnGap?: string;
  height?: string;
  width?: string;
  minHeight?: string;
  maxWidth?: string;
  padding?: string;
};

const Grid = styled.div<grid>`
  display: grid;
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "100%"};
  min-height: ${({ minHeight }) => minHeight};
  max-width: ${({ maxWidth }) => maxWidth};
  gap: ${({ gap }) => gap};
  row-gap: ${({ rowGap }) => rowGap};
  align-items: ${({ align }) => align};
  column-gap: ${({ columnGap }) => columnGap};
  justify-content: ${({ justify }) => justify};
  grid-template-columns: ${({ templateColumns }) => templateColumns};
  padding: ${({ padding }) => padding};
`;

export default Grid;
