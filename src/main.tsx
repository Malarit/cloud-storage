import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import GlobalStyle from "./GlobalStyle.ts";
import App from "./route/App.tsx";
import Theme from "./Theme.tsx";

const root = document.getElementById("root") as HTMLElement;
const queryClient = new QueryClient();

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Theme>
          <GlobalStyle />
          <App />
        </Theme>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
