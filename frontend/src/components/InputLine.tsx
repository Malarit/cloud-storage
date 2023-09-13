import React from "react";
import styled from "styled-components";
import Wrapper from "./Wrapper";

type input = {
  padding?: string;
  width?: string;
  height?: string;
  margin?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type?: string;
  autoComplete?: string;
  name?: string;
};

type line = {
  active: boolean;
};

const Line = styled.div<line>`
  position: absolute;
  width: 100%;
  height: 2px;
  background: ${({ theme }) =>
    `linear-gradient(to left, #ffffff 50%, ${theme.colors.blue} 50%) right`};
  background-size: 200% 100%;
  transition: all 0.5s ease;
  ${({ active }) => active && `background-position: left;`}
  border-radius: ${({ theme }) => theme.border.radius};
`;

const StyledInputLine = styled.input<input>`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "100%"};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  background-color: transparent;
  outline: none;
  border: none;
  color: #fff;
  border-radius: ${({ theme }) => theme.border.radius};
`;

const InputLine: React.FC<input> = (props) => {
  const [active, setActive] = React.useState(false);

  return (
    <Wrapper height="max-content" position="relative">
      <StyledInputLine
        {...props}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(Boolean(props.value))}
      />
      <Line active={active} />
    </Wrapper>
  );
};

export default InputLine;
