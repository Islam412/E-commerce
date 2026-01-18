import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
      primary: {
        main: "#001F54",
      },
      secondary: {
        main: "#CFAE70",
      },
      tertiary: {
        main: "#FFFFFF",
      },
    },
    typography: {
      fontFamily: "var(--font-geist-sans)",
    },
  });
  

export default theme;
