import React from "react";

import Button from "./Button";
import InputLine from "./InputLine";
import Modal from "./Modal";
import Title from "./Title";
import Wrapper from "./Wrapper";

import { theme } from "../Theme";
import Blackout from "./Blackout";

type modalNewFolder = {
  title: string;
  onClickCancel?: () => void;
  onClickSave?: (value: string) => void;
};

const ModalNewFolder: React.FC<modalNewFolder> = (props) => {
  const { onClickCancel, onClickSave, title } = props;
  const [value, setValue] = React.useState(title);
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
          <InputLine onChange={(e) => setValue(e.target.value)} value={value} />
        </Wrapper>
        <Wrapper bottom="1em" right="1em" position="absolute">
          <Button {...buttonProps} onClick={onClickCancel}>
            Отмена
          </Button>
          <Button {...buttonProps} onClick={() => onClickSave?.(value)}>
            Сохранить
          </Button>
        </Wrapper>
      </Modal>
    </>
  );
};

export default ModalNewFolder;
