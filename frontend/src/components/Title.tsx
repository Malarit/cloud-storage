import styled from "styled-components";
import { fonstSizesKeys } from "../Theme";

type title = {
  children?: React.ReactNode;
  fontSize?: fonstSizesKeys;
  color?: string;
  margin?: string;
  width?: string;
  height?: string;
  textAlign?: string;
  maxWidth?: string;
  overflow?: string;
  textOverflow?: string;
  minWidth?: string;
};

const Title = styled.div<title>`
  font-size: ${({ fontSize, theme }) => fontSize && theme.fontSizes[fontSize]};
  font-family: ${({ theme }) => theme.fonts};
  color: ${({ color }) => color};
  margin: ${({ margin }) => margin};
  width: ${({ margin }) => margin};
  min-width: ${({ minWidth }) => minWidth};
  max-width: ${({ maxWidth }) => maxWidth};
  overflow: ${({ overflow }) => overflow};
  text-overflow: ${({ textOverflow }) => textOverflow};
  height: ${({ height }) => height};
  text-align: ${({ textAlign }) => textAlign};
`;

export default Title;
