import React from "react";
import styled from "styled-components";
import { fonstSizesKeys } from "../Theme";
import Title from "./Title";

type list = {
  text: string;
  check: boolean;
};

type ul = {
  children?: React.ReactNode;
  bgColor?: string;
  margin?: string;
  fontSize?: fonstSizesKeys;
  width?: string;
  height?: string;
};

type li = {
  padding?: string;
  color: string;
};

type checkListProps = {
  list: list[];
  colorNegative: string;
  title?: string;
} & ul &
  li;

const StyledUl = styled.ul<ul>`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "100%"};
  margin: ${({ margin }) => margin || 0};
  background-color: ${({ bgColor }) => bgColor};
  border-radius: ${({ theme }) => theme.border.radius};
  font-family: ${({ theme }) => theme.fonts};
  font-size: ${({ theme, fontSize }) => theme.fontSizes[fontSize || "small"]};
`;

const StyledLi = styled.li<li>`
  width: 100%;
  height: 100%;
  color: ${({ color }) => color};
  padding: ${({ padding }) => padding || 0};
`;

const CheckList: React.FC<checkListProps> = (props) => {
  const { list, color, colorNegative, title, ...anyProps } = props;
  return (
    <StyledUl {...anyProps}>
      <Title color={color}>{title}</Title>
      {list.map(({ text, check }, i) => (
        <StyledLi key={i} {...anyProps} color={check ? color : colorNegative}>
          {text}
        </StyledLi>
      ))}
    </StyledUl>
  );
};

export default CheckList;
