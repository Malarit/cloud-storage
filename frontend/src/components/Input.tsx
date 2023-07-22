import React from "react";
import styled, { css } from "styled-components";
import Flex from "./Flex";

type input = {
  name?: string;
  type?: React.HTMLInputTypeAttribute;
  value: string | number | readonly string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  height?: string;
  padding?: string;
  autoComplete?: string;
  color?: string;
};

type placeholder = {
  active: boolean;
  translateY?: string;
  padding?: string;
  colorPlaceholder?: string;
};

type inputProps = input & {
  placeholder: string;
  colorPlaceholder?: string;
};

const attrsPlaceholder = ({ translateY, active }: placeholder) => ({
  style: active
    ? {
        transform: `translateY(calc((${translateY} * -1) - 0.2em))`,
      }
    : {},
});

const Placeholder = styled.div.attrs<placeholder>(
  attrsPlaceholder
)<placeholder>`
  position: absolute;
  pointer-events: none;
  border-radius: ${({ theme }) => theme.border.radius};
  padding: ${({ padding }) => padding};
  transition: transform 0.5s ease;
  z-index: 2;
  color: ${({ colorPlaceholder }) => colorPlaceholder};

  ${({ active, theme }) =>
    active &&
    css`
      background-color: #fff;
      color: ${theme.colors.blue};
      margin-bottom: 0.4em;
      &::before {
        content: "";
        position: absolute;
        top: 100%;
        left: 0.4em;
        border-left: 0.4em solid transparent;
        border-right: 0.4em solid transparent;
        border-top: 0.4em solid #ffffff;
      }
    `}
`;

const StyledInput = styled.input<input>`
  width: 100%;
  outline: none;
  height: ${({ height }) => height};
  border-radius: ${({ theme }) => theme.border.radius};
  padding: ${({ padding }) => padding};
  outline: none;
  border: none;
  z-index: 1;
`;

const JustTransition = styled.div`
  & > div {
    transition: margin 0.5s ease;
  }
`;

const Input: React.FC<inputProps> = (props) => {
  const { placeholder, value, padding, colorPlaceholder, ...inputProps } =
    props;
  const [active, setActive] = React.useState(false);

  return (
    <JustTransition>
      <Flex
        margin={active ? `calc(${props.height}) 0 0` : ""}
        align="center"
        position="relative"
      >
        <StyledInput
          onFocus={() => setActive(true)}
          onBlur={() => setActive(Boolean(props.value))}
          value={value || ""}
          padding={padding}
          {...inputProps}
        />
        <Placeholder
          padding={padding}
          active={active}
          translateY={props.height}
          colorPlaceholder={colorPlaceholder}
        >
          {placeholder}
        </Placeholder>
      </Flex>
    </JustTransition>
  );
};

export default Input;
