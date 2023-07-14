import { ThemeProvider } from "styled-components";

export const theme = {
  colors: {
    blue: "#0073ff",
    white: "#fff",
    gray: "#414141",
  },
  fonts: ["sans-serif", "Roboto"],
  fontSizes: {
    small: "1em",
    medium: "1.5em",
    large: "2em",
  },
  border: {
    radius: "max(0.4vw, 0.4vh)",
  },
};

export type fonstSizesKeys = keyof (typeof theme)["fontSizes"];

const Theme: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
