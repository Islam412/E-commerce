import "@mui/material/styles";

declare module "@mui/material/styles" {
  // ✅ عشان تقدر تعمل palette.tertiary
  interface Palette {
    tertiary: Palette["primary"];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
  }

  // ✅ عشان تقدر تعمل error.lighter / success.lighter
  interface PaletteColor {
    lighter?: string;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
  }
}
