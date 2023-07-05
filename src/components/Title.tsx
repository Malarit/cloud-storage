import styled from "styled-components";
import { fonstSizesKeys } from "../Theme";

type title = {
  children?: React.ReactNode;
  fontFamily?: fonstSizesKeys;
  color?: string;
  margin?: string;
};

const Title = styled.div<title>`
  font-size: ${({ fontFamily, theme }) =>
    fontFamily && theme.fontSizes[fontFamily]};
  font-family: ${({ theme }) => theme.fonts};
  color: ${({ color }) => color};
  margin: ${({ margin }) => margin};
`;

export default Title;
