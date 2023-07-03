import styled from "styled-components";

type input = {
  type?: React.HTMLInputTypeAttribute;
  value?: string | number | readonly string[];
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const Input = styled.input<input>`
  width: 100%;
  height: 100%;
`;

export default Input;
