import React from "react";
import Auth, { input } from "../../components/Auth";
import { customMatch } from "../../services/regex";

const regList: input[] = [
  {
    name: "login",
    placeholder: "Логин",
    type: "text",
    autoComplete: "off",
    checkList: [],
  },
  {
    name: "email",
    placeholder: "Почта",
    type: "text",
    autoComplete: "off",
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

const authList: input[] = [
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

const AuthContainer: React.FC = () => {
  const [toggle, setToggle] = React.useState(true);

  const onClickAuth = () => {};
  const onClickReg = () => {};

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
          onClickButton={onClickAuth}
          {...generalProps}
        />
      ) : (
        <Auth
          key={1}
          title="Регистрация"
          buttonText="Зарегистрироваться"
          toggleText="Есть аккаунт?"
          list={regList}
          onClickButton={onClickReg}
          {...generalProps}
        />
      )}
    </>
  );
};

export default AuthContainer;
