import { observer } from "mobx-react-lite";
import Flex from "../components/Flex";
import Grid from "../components/Grid";
import Title from "../components/Title";
import Wrapper from "../components/Wrapper";
import MenuContainer from "../containers/home/MenuContainer";
import ModalNewFolderContainer from "../containers/home/ModalNewFolderContainer";
import Modal, { modals } from "../store/files";
import Screens, { screens } from "../store/screens";
import { theme } from "../Theme";
import UploadingFilesContainer from "../containers/home/UploadingFilesContainer";
import DropFilesPageContainer from "../containers/home/DropFilesPageContainer";
import UploadContainer from "../containers/home/UloadContainer";
import Cloud from "../screens/pages/Cloud";
import Search from "../components/Search";

const JSX_SCREENS: { [key in screens]: JSX.Element } = {
  cloud: <Cloud />,
  profile: <Title color="#fff">3</Title>,
  basket: <Title color="#fff">4</Title>,
};

const JSX_MODALS: { [key in modals]: JSX.Element } = {
  "new folder": <ModalNewFolderContainer />,
  "upload file": <></>,
  "upload folder": <></>,
};

const Home: React.FC = observer(() => {
  return (
    <DropFilesPageContainer>
      <UploadContainer />
      <Wrapper minHeight="100vh">
        {Modal.activeModal && JSX_MODALS[Modal.activeModal]}
        <Grid
          minHeight="100vh"
          height="100%"
          templateColumns="max(250px, 15%) 1fr"
        >
          <Flex direction="column">
            <Wrapper minHeight="3.5em" margin="0 1em" width="100%">
              <Title height="100%" fontSize="medium" color="#fff">
                <Flex align="center">Logo</Flex>
              </Title>
            </Wrapper>
            <MenuContainer />
            <Wrapper height="100%" position="relative">
              <UploadingFilesContainer />
            </Wrapper>
          </Flex>
          <Wrapper padding="0 0 0 1em" borderRadius={theme.border.radius}>
            <Wrapper height="3.5em">
              <Search />
            </Wrapper>
            <Wrapper>{JSX_SCREENS[Screens.activeScreen]}</Wrapper>
          </Wrapper>
        </Grid>
      </Wrapper>
    </DropFilesPageContainer>
  );
});

export default Home;
