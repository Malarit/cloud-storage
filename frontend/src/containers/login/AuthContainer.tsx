import React from "react";
import Auth from "../../components/Auth";
import { customMatch } from "../../services/regex";
import { authorization, registration } from "../../hooks/queries";
import { observer } from "mobx-react-lite";
import account from "../../store/account";

type inputs = React.ComponentProps<typeof Auth>["list"];
type input = inputs[number];
type inputKeysReg = "userName" | "email" | "password";
type inputKeysAuth = "email" | "password";
type valueOnClick<T extends string> = { [key in T]: string };

interface kInput<T extends string> extends input {
  name: T;
}

const regList: kInput<inputKeysReg>[] = [
  {
    name: "userName",
    placeholder: "Логин",
    type: "text",
    autoComplete: "off",
    checkList: [],
  },
  {
    name: "email",
    placeholder: "Почта",
    type: "text",
    autoComplete: "email",
    checkList: [
      {
        text: "Укажите действительную почту",
        checkFn: (value) => Boolean(customMatch(value, "email")),
      },
    ],
  },
  {
    name: "password",
    placeholder: "Пароль",
    type: "password",
    autoComplete: "new-password",
    checkListTitle: "Пароль должен:",
    checkList: [
      {
        text: "Содержать хотябы одну цифру",
        checkFn: (value) => Boolean(customMatch(value, "oneDigit")),
      },
      {
        text: "Содержать хотябы одну заглавную ланискую букву",
        checkFn: (value) => Boolean(customMatch(value, "allUpperCase")),
      },
      {
        text: "Содержать хотябы 8 символов",
        checkFn: (value) => Boolean(customMatch(value, "eightСhar")),
      },
    ],
  },
];

const authList: kInput<inputKeysAuth>[] = [
  {
    name: "email",
    placeholder: "Почта",
    type: "text",
    autoComplete: "email",
    checkList: [],
  },
  {
    name: "password",
    placeholder: "Пароль",
    type: "password",
    autoComplete: "current-password",
    checkList: [],
  },
];

const AuthContainer: React.FC = observer(() => {
  const [toggle, setToggle] = React.useState(true);
  const mutationOption = { onSuccess: () => account.requestUserId() };
  const mutation_auth = authorization(mutationOption);
  const mutation_reg = registration(mutationOption);
  const onClickAuth = (value: valueOnClick<inputKeysAuth>) =>
    mutation_auth.mutate(value);
  const onClickReg = (value: valueOnClick<inputKeysReg>) =>
    mutation_reg.mutate(value);

  const generalProps = {
    inputHeight: "max(3.5vh, 35px)",
    buttonHeight: "max(4vh, 40px)",
    onClicktoggle: () => setToggle((curr) => !curr),
  };

  return (
    <>
      {toggle ? (
        <Auth
          key={0}
          title="Авторизация"
          buttonText="Авторизоваться"
          toggleText="Нет аккаунта?"
          list={authList}
          {...generalProps}
          onClickButton={(value) =>
            onClickAuth(value as valueOnClick<inputKeysAuth>)
          }
        />
      ) : (
        <Auth
          key={1}
          title="Регистрация"
          buttonText="Зарегистрироваться"
          toggleText="Есть аккаунт?"
          list={regList}
          {...generalProps}
          onClickButton={(value) =>
            onClickReg(value as valueOnClick<inputKeysReg>)
          }
        />
      )}
    </>
  );
});

export default AuthContainer;
