import  styled  from "styled-components";

type button = {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button = styled.button<button>`
  width: 100%;
  height: 100%;
`;

export default Button;
