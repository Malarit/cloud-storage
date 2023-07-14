import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import Login from "../pages/login";
import Home from "../pages/home";

const StyledApp = styled.div`
  max-width: 100vw;
  width: 100%;
  padding: 0 1em;
  overflow: hidden;
`;

function App() {
  return (
    <StyledApp>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </StyledApp>
  );
}

export default App;
