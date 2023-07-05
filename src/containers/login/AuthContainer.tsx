import Auth, { input } from "../../components/Auth";

const authList: input[] = [
  {
    name: "name",
    placeholder: "Имя",
    type: "text",
  },
  {
    name: "email",
    placeholder: "Почта",
    type: "text",
  },
  {
    name: "password",
    placeholder: "Пароль",
    type: "password",
  },
];

const AuthContainer: React.FC = () => {
  return (
    <Auth
      title="Регистрация"
      buttonText="Зарегистрироваться"
      list={authList}
      inputHeight="max(3.5vh, 35px)"
      buttonHeight="max(4vh, 40px)"
    />
  );
};

export default AuthContainer;
