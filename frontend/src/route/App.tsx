import { Route, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Login from "../pages/login";
import Home from "../pages/home";
import React from "react";
import account from "../store/account";
import { observer } from "mobx-react-lite";

const StyledApp = styled.div`
  max-width: 100vw;
  width: 100%;
  padding: 0 1em;
  overflow: hidden;
`;

const App = observer(() => {
  const navigate = useNavigate();
  const refFlag = React.useRef<boolean>(true);

  React.useEffect(() => {
    if (refFlag.current) {
      account.requestUserId();
    }
    refFlag.current = false;

    const timer = setInterval(() => {
      account.requestUserId();
    }, 1000 * 1800); // 30 min
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    if (account.userId === -1) return;
    if (!account.userId) navigate("/login");
    else navigate("/");
  }, [account.userId]);

  return (
    <StyledApp>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </StyledApp>
  );
});

export default App;
