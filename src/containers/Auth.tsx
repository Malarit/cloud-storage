import styled from "styled-components";

import Input from "../components/Input";
import Button from "../components/Button";
import Flex from "../components/Flex";
import Wrapper from "../components/Wrapper";

const StyledAuth = styled.div``;

const Auth: React.FC = () => {
  const arr = [...new Array(5)];

  return (
    <Flex height="max-content" direction="column">
      {arr.map((_, i) => (
        <Wrapper height="30px" margin="10px 0 0 0" key={i}>
          <Input />
        </Wrapper>
      ))}
      <Wrapper margin="10px 0 0 0">
        <Button>asd</Button>
      </Wrapper>
    </Flex>
  );
};

export default Auth;
