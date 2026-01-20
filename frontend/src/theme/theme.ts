import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#001F54",
    },
    secondary: {
      main: "#CFAE70",
    },

    // ✅ Error palette
    error: {
      main: "#D32F2F",
      light: "#FDECEA",   // fallback
      dark: "#9A0007",
      lighter: "#FDECEA", // 👈 اللي هنستخدمه
    },

    // ✅ Success palette
    success: {
      main: "#2E7D32",
      light: "#EDF7ED",
      dark: "#1B5E20",
      lighter: "#EDF7ED", // 👈 اللي هنستخدمه
    },

    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#001F54",
      secondary: "#6B7280",
    },
  },

  typography: {
    fontFamily: "var(--font-geist-sans)",
  },
});

export default theme;
