import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import styled  from "styled-components";

const StyledApp = styled.div``;

function App() {
  return (
    <StyledApp>
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </StyledApp>
  );
}

export default App;
