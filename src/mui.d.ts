import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    gray: Palette["primary"];
    danger: Palette["primary"];
    information: Palette["primary"];
    warning: Palette["primary"];
    success: Palette["primary"];
    point: Palette["primary"];
  }

  interface PaletteOptions {
    gray?: PaletteOptions["primary"];
    danger?: PaletteOptions["primary"];
    information?: PaletteOptions["primary"];
    warning?: PaletteOptions["primary"];
    success?: PaletteOptions["primary"];
    point?: PaletteOptions["primary"];
  }
}
