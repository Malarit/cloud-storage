import Input from "./Input";
import Button from "./Button";
import Flex from "./Flex";
import Wrapper from "./Wrapper";
import Title from "./Title";

import { theme } from "../Theme";
import React from "react";
import createObjFromArrValueToKey from "../utils/createObjFromArrValueToKey";

export type input = {
  name: string;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
};

type auth = {
  list: input[];
  inputHeight: string;
  buttonHeight: string;
  title: string;
  buttonText: string;
};

const Auth: React.FC<auth> = (props) => {
  const { list, inputHeight, buttonHeight, title, buttonText } = props;
  const [value, setValue] = React.useState(
    createObjFromArrValueToKey(list, "name", "")
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue((curr) => ({ ...curr, [name]: value }));
  };

  const inputs = list.map((input, i) => (
    <Wrapper margin="10px 0 0 0" key={i}>
      <Input
        {...input}
        onChange={onChange}
        height={inputHeight}
        value={value[input.name]}
      />
    </Wrapper>
  ));

  return (
    <Flex height="max-content" direction="column">
      <Title margin="0 auto" fontFamily="medium" color={theme.colors.blue}>
        {title}
      </Title>
      {inputs}
      <Button height={buttonHeight} margin="15px auto">
        {buttonText}
      </Button>
    </Flex>
  );
};

export default Auth;
