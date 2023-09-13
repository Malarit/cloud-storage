import Flex from "../components/Flex";
import Grid from "../components/Grid";
import Icon from "../components/Icon";
import Wrapper from "../components/Wrapper";
import AuthContainer from "../containers/login/AuthContainer";
import imgNegate from "../assets/menu/imgNegate.png";

const Login: React.FC = () => {
  return (
    <Wrapper minHeight="100vh">
      <Grid
        height="100vh"
        templateColumns="1fr clamp(320px, 100%, min(750px, 60%))"
      >
        <Flex height="100vh">
          <Icon
            objectFit="contain"
            maxHeight="100%"
            maxWidth="100%"
            src={imgNegate}
          />
        </Flex>
        <Wrapper bgColor="#3e3e3e">
          <Wrapper margin="0 auto" height="100%" maxWidth="40%">
            <Flex align="center">
              <AuthContainer />
            </Flex>
          </Wrapper>
        </Wrapper>
      </Grid>
    </Wrapper>
  );
};

export default Login;
