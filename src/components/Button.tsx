import styled from "styled-components";

export type button = {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  width?: string;
  height?: string;
  margin?: string;
  color?: string;
  bgColor?: string;
  bgColorHover?: string;
  textAlign?: string;
  padding?: string;
  disableHover?: boolean;
  title?: string;
  name?: string;
};

const Button = styled.button<button>`
  width: ${({ width }) => width || "max-content"};
  height: ${({ height }) => height || "100%"};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  background-color: ${({ theme, bgColor }) => bgColor || theme.colors.blue};
  border-radius: ${({ theme }) => theme.border.radius};
  color: ${({ color }) => color || "#fff"};
  text-align: ${({ textAlign }) => textAlign};
  border: none;
  cursor: pointer;

  ${({ disableHover, bgColorHover }) =>
    !disableHover &&
    `&:hover {
        background-color: ${bgColorHover};
      }
    `};
`;

export default Button;
