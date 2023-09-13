import React from "react";

import Input from "./Input";
import Button from "./Button";
import Flex from "./Flex";
import Wrapper from "./Wrapper";
import Title from "./Title";

import { theme } from "../Theme";
import CheckList from "./CheckList";
import checkValuesObjArr from "../utils/checkValuesObjArr";

export type checkListType = {
  text: string;
  checkFn: (value: string) => boolean;
};

export type input = {
  name: string;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
  autoComplete: string;
  checkList: checkListType[];
  checkListTitle?: string;
};

type auth = {
  list: input[];
  inputHeight: string;
  buttonHeight: string;
  title: string;
  buttonText: string;
  toggleText: string;
  onClickButton?: (value: { [key: string]: string }) => void;
  onClicktoggle?: () => void;
  err?: { text: string; check: boolean };
};

function createInital(list: input[]) {
  const initalValue = {} as { [key: string]: string };
  const initalCheck = {} as {
    [key: string]: { text: string; check: boolean }[];
  };

  list.map((item) => {
    const key = item.name;
    initalValue[key] = "";
    initalCheck[key] = item.checkList.map((item) => ({
      text: item.text,
      check: true,
    }));
  });

  return { initalValue, initalCheck };
}

const Auth: React.FC<auth> = (props) => {
  const {
    list,
    inputHeight,
    buttonHeight,
    title,
    buttonText,
    toggleText,
    onClickButton,
    onClicktoggle,
    err,
  } = props;
  const { initalValue, initalCheck } = createInital(list);
  const [value, setValue] = React.useState(initalValue);
  const [check, setCheck] = React.useState(initalCheck);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValue((curr) => {
      return { ...curr, [name]: value };
    });

    checkList(name, value);
  };

  const checkList = (name: string, value: string = "") => {
    const input = list.find((input) => input.name === name);
    if (!input) return;

    const newCheckList = input.checkList.map((item) => {
      const { text, checkFn } = item;
      return { text, check: checkFn(value) };
    });
    setCheck((curr) => ({ ...curr, [name]: newCheckList }));
  };

  const inputs = list.map((input, i) => (
    <Wrapper margin="10px 0 0 0" key={i}>
      <Input
        {...input}
        padding="0.3em"
        onChange={onChange}
        height={inputHeight}
        value={value[input.name]}
      />
      {!checkValuesObjArr(check[input.name], "check", true) && (
        <CheckList
          padding="0 0.2em"
          title={input.checkListTitle}
          list={check[input.name]}
          margin="0.5em 0 0 0"
          color={"#fff"}
          colorNegative={"#ff0000"}
        />
      )}
    </Wrapper>
  ));

  return (
    <Flex height="max-content" direction="column">
      <Title margin="0 auto" fontSize="medium" color={theme.colors.blue}>
        {title}
      </Title>
      {inputs}
      {err && err["check"] && (
        <CheckList
          list={[{ text: err?.text, check: err?.check }]}
          colorNegative={"#ff0000"}
          color={"#ff0000"}
          padding="0 0.2em"
          margin="0.5em 0 0 0"
        />
      )}
      <Button
        onClick={() => onClickButton?.(value)}
        height={buttonHeight}
        margin="1em auto 0 auto"
      >
        {buttonText}
      </Button>
      <Button
        bgColor="transparent"
        height={buttonHeight}
        margin="0.2em auto 0 auto"
        onClick={onClicktoggle}
      >
        {toggleText}
      </Button>
    </Flex>
  );
};

export default Auth;
