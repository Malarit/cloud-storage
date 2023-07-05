import styled from "styled-components";

type button = {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  width?: string;
  height?: string;
  margin?: string;
};

const Button = styled.button<button>`
  width: ${({ width }) => width || "max-content"};
  height: ${({ height }) => height || "100%"};
  margin: ${({ margin }) => margin};
  
  background-color: ${({theme}) => theme.colors.blue};
  border-radius: ${({theme}) => theme.border.radius};
  color: #fff;
  border: none;
  
  cursor: pointer;
`;

export default Button;
