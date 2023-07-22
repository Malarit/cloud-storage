import Flex from "../components/Flex";
import Grid from "../components/Grid";
import Wrapper from "../components/Wrapper";
import AuthContainer from "../containers/login/AuthContainer";

const Login: React.FC = () => {
  return (
    <Wrapper minHeight="100vh">
      <Grid
        height="100vh"
        templateColumns="1fr clamp(320px, 100%, min(750px, 60%))"
      >
        <div></div>
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
