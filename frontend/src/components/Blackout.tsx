import styled from "styled-components";

const Blackout = styled.div`
  position: absolute;
  min-height: 100vh;
  height: 100%;
  min-width: 100vw;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.225);
  top: 0;
  left: 0;
  z-index: 2;
`;

export default Blackout;
