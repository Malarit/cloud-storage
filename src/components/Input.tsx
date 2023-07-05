import React from "react";
import styled, { css } from "styled-components";
import Flex from "./Flex";

type input = {
  name?: string;
  type?: React.HTMLInputTypeAttribute;
  value: string | number | readonly string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  height?: string;
};

type placeholder = {
  active: boolean;
  translateY?: string;
};

type inputProps = input & {
  placeholder: string;
};

const attrsPlaceholder = ({ translateY, active }: placeholder) => ({
  style: active
    ? {
        transform: `translateY(calc(${translateY} * -1))`,
      }
    : {},
});

const Placeholder = styled.div.attrs<placeholder>(
  attrsPlaceholder
)<placeholder>`
  position: absolute;
  pointer-events: none;
  border-radius: ${({ theme }) => theme.border.radius};
  padding: 0.2em;
  transition: transform 0.5s ease;

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
  height: ${({ height }) => height};
  border-radius: ${({ theme }) => theme.border.radius};
  outline: none;
`;

const JustTransition = styled.div`
  & > div {
    transition: margin 0.5s ease;
  }
`;

const Input: React.FC<inputProps> = (props) => {
  const { placeholder, ...inputProps } = props;
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
          {...inputProps}
        />
        <Placeholder active={active} translateY={props.height}>
          {placeholder}
        </Placeholder>
      </Flex>
    </JustTransition>
  );
};

export default Input;
