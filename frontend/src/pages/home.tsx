import { observer } from "mobx-react-lite";

import Modal, { modals } from "../store/files";
import Screens, { screens } from "../store/screens";
import { theme } from "../Theme";

import Wrapper from "../components/Wrapper";
import Title from "../components/Title";
import Flex from "../components/Flex";
import Grid from "../components/Grid";

import UploadingFilesContainer from "../containers/home/UploadingFilesContainer";
import DropFilesPageContainer from "../containers/home/DropFilesPageContainer";
import ModalDeleteFile from "../containers/home/cloud/ModalDeleteFile";
import UploadContainer from "../containers/home/UploadContainer";
import MenuContainer from "../containers/home/MenuContainer";
import CloudContainer from "../containers/home/cloud/CloudContainer";
import CloudContainerTrash from "../containers/home/trash/CloudContainerTrash";
import ModalRecoverFile from "../containers/home/ModalRecoverFile";
import ModalNewFolderContainer from "../containers/home/ModalNewFolderContainer";
import ModalUpdateNameContainer from "../containers/home/ModalUpdateNameContainer";
import SearchContainer from "../containers/home/SearchContainer";
import DownloadContainer from "./../containers/home/DownloadContainer";
import ModalDeleteFileTrash from "../containers/home/trash/ModalDeleteFileTrash";
import Profile from "../containers/profile";

const JSX_SCREENS: { [key in screens]: JSX.Element } = {
  cloud: <CloudContainer />,
  trash: <CloudContainerTrash />,
  profile: <Profile />,
};

const JSX_MODALS: { [key in modals]: JSX.Element } = {
  delete: <ModalDeleteFile />,
  recover: <ModalRecoverFile />,
  download: <DownloadContainer />,
  "delete trash": <ModalDeleteFileTrash />,
  "new folder": <ModalNewFolderContainer />,
  "update name": <ModalUpdateNameContainer />,
  "upload file": <></>,
  "upload folder": <></>,
};

const Home: React.FC = observer(() => {
  return (
    <Wrapper padding="0 1em">
      <DropFilesPageContainer>
        <UploadContainer />
        <Wrapper minHeight="100vh">
          {Modal.activeModal && JSX_MODALS[Modal.activeModal]}
          <Grid
            minHeight="100vh"
            height="100%"
            templateColumns="max(250px, 15%) 1fr"
          >
            <Flex maxHeight="100vh" direction="column">
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
            <Wrapper
              maxHeight="100vh"
              padding="0 0 0 1em"
              borderRadius={theme.border.radius}
            >
              <Wrapper height="3.5em">
                <SearchContainer />
              </Wrapper>
              <Wrapper>{JSX_SCREENS[Screens.activeScreen]}</Wrapper>
            </Wrapper>
          </Grid>
        </Wrapper>
      </DropFilesPageContainer>
    </Wrapper>
  );
});

export default Home;
