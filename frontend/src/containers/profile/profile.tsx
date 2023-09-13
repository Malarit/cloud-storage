import React from "react";
import styled from "styled-components";
import InputLine from "../../components/InputLine";
import Flex from "../../components/Flex";
import Title from "../../components/Title";
import Button from "../../components/Button";
import {
  exitLogin_query,
  updateUserData,
  userData_query,
} from "../../hooks/queries";
import { observer } from "mobx-react-lite";
import account from "../../store/account";

const StyledProfile = styled.div`
  max-width: 40%;
  min-height: 100vh;
  padding: 2em 0;
`;

const InputsList = styled.div``;

const CustomFlex = styled(Flex)`
  & > div:not(:first-of-type) {
    margin-top: 1em;
  }

  & > button {
    margin-right: 1em;
  }
`;

const Profile: React.FC = observer(() => {
  const { refetch } = exitLogin_query({
    refetchOnWindowFocus: false,
    enabled: false,
  });
  const { data } = userData_query();
  const mutationUpdateUser = updateUserData();

  const [dataInput, setDataInput] = React.useState({
    email: "",
    userName: "",
  });

  React.useEffect(() => {
    setDataInput({ userName: data?.userName || "", email: data?.email || "" });
  }, [data]);

  return (
    <StyledProfile>
      <InputsList>
        <Flex>
          <CustomFlex direction="column">
            <Title margin="0 0.5em 0 0" color="#fff">
              Почта:
            </Title>
            <Title margin="0 0.5em 0 0" color="#fff">
              Логин:
            </Title>
          </CustomFlex>
          <CustomFlex direction="column">
            <InputLine
              value={dataInput.email}
              onChange={(e) =>
                setDataInput((curr) => ({ ...curr, email: e.target.value }))
              }
              name="email"
              autoComplete="off"
            />
            <InputLine
              value={dataInput.userName}
              onChange={(e) =>
                setDataInput((curr) => ({ ...curr, userName: e.target.value }))
              }
              name="login"
              autoComplete="off"
            />
          </CustomFlex>
        </Flex>
        <CustomFlex margin="2em 0">
          <Button
            onClick={() => {
              mutationUpdateUser.mutate(dataInput);
            }}
            height="2em"
            width="6em"
          >
            Сохранить
          </Button>
          <Button
            bgColor="red"
            onClick={() => {
              account.setUserId(-1);
              refetch();
            }}
            height="2em"
            width="5em"
          >
            Выйти
          </Button>
        </CustomFlex>
      </InputsList>
    </StyledProfile>
  );
});

export default Profile;
