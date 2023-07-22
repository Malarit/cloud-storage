import styled from "styled-components";

type icon = {
  maxWidth?: string;
  width?: string;
  height?: string;
  margin?: string;
};

const Icon = styled.img<icon>`
  width: ${({ width }) => width};
  max-width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
`;

export default Icon;
