import styled from "styled-components";
import Modal from "./Modal";
import Title from "./Title";
import Blackout from "./Blackout";
import Flex from "./Flex";

import boxWhite from "../assets/menu/box white.svg";

const Icon = styled.img`
  width: 7em;
`;

const ModalDropFile: React.FC = () => {
  return (
    <Modal height="100vh" width="100vw" color="#fff">
      <Blackout />
      <Flex direction="column" align="center" justify="center">
        <Icon src={boxWhite} />
        <Title fontSize="large">Загрузить файл</Title>
      </Flex>
    </Modal>
  );
};

export default ModalDropFile;
