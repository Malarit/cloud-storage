import styled from "styled-components";

type icon = {
  maxWidth?: string;
  maxHeight?: string;
  width?: string;
  height?: string;
  margin?: string;
  objectFit?: string;
};

const Icon = styled.img<icon>`
  width: ${({ width }) => width};
  max-width: ${({ width }) => width || "100%"};
  max-height: ${({ maxHeight }) => maxHeight};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
  object-fit: ${({ objectFit }) => objectFit};
`;

export default Icon;
