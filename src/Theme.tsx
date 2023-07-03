import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    blue: "#0051ff",
    white: "#fff",
    gray: "#414141",
  },
  fonts: ["sans-serif", "Roboto"],
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em",
  },
};

const Theme: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
