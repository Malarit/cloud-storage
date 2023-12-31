import React from "react";

import Button from "./Button";
import InputLine from "./InputLine";
import Modal from "./Modal";
import Title from "./Title";
import Wrapper from "./Wrapper";

import { theme } from "../Theme";
import Blackout from "./Blackout";

type modalSmall = {
  title: string;
  buttonLeftText: string;
  buttonRightText: string;
  onClickRight?: (value: string) => void;
  onClickLeft?: () => void;
  inputValue?: string;
  disableInput?: boolean;
};

const ModalSmall: React.FC<modalSmall> = (props) => {
  const {
    onClickRight,
    onClickLeft,
    title,
    inputValue,
    buttonLeftText,
    buttonRightText,
    disableInput,
  } = props;
  const [value, setValue] = React.useState(inputValue || "");
  const buttonProps = {
    bgColor: "transparent",
    color: theme.colors.blue,
  };
  return (
    <>
      <Blackout />
      <Modal height="9em" width="17em" color="#fff">
        <Title fontSize="medium">{title}</Title>
        <Wrapper margin="0.5em 0 0 0">
          {!disableInput ? (
            <InputLine
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
          ) : (
            <Title>{inputValue}</Title>
          )}
        </Wrapper>
        <Wrapper bottom="1em" right="1em" position="absolute">
          <Button {...buttonProps} onClick={onClickLeft}>
            {buttonLeftText}
          </Button>
          <Button {...buttonProps} onClick={() => onClickRight?.(value)}>
            {buttonRightText}
          </Button>
        </Wrapper>
      </Modal>
    </>
  );
};

export default ModalSmall;
