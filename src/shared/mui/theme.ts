"use client";

import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  breakpoints: {
    values: {
      // extra-small
      // 표준형 스타일은 xsmall의 디바이스는 최적화에 포함되지 않는다.
      xs: 360,
      // small
      sm: 768,
      // medium
      md: 1024,
      // large
      lg: 1280,
      // extra-large
      xl: 1600,
    },
  },
  palette: {
    mode: "light",
    contrastThreshold: 4.5,
    primary: {
      main: "#256ef4",
      50: "#ecf2fe",
      100: "#d8e5fd",
      200: "#b1cefb",
      300: "#86aff9",
      400: "#4c87f6",
      500: "#256ef4",
      600: "#0b50d0",
      700: "#083891",
      800: "#052561",
      900: "#03163a",
    },
    secondary: {
      main: "#268097",
      50: "#edf6f8",
      100: "#d5ebf1",
      200: "#abd8e3",
      300: "#75c0d1",
      400: "#3d9fb8",
      500: "#268097",
      600: "#1f687a",
      700: "#17505e",
      800: "#113b45",
      900: "#0e3139",
    },
    gray: {
      main: "#6d7882",
      50: "#f4f5f6",
      100: "#e6e8ea",
      200: "#cdd1d5",
      300: "#b1b8be",
      400: "#8a949e",
      500: "#6d7882",
      600: "#58616a",
      700: "#464c53",
      800: "#33363d",
      900: "#1e2124",
    },
    error: {
      light: "#fdefec",
      dark: "#bd2c0f",
      main: "#de3412",
      50: "#fdefec",
      100: "#fcdfd9",
      200: "#f7afa1",
      300: "#f48771",
      400: "#f05f42",
      500: "#de3412",
      600: "#bd2c0f",
      700: "#8a240f",
      800: "#5c180a",
      900: "#390d05",
      contrastText: "#fff",
    },
    warning: {
      main: "#9e6a00",
      50: "#fff3db",
      100: "#ffe0a3",
      200: "#ffc95c",
      300: "#ffb114",
      400: "#c78500",
      500: "#9e6a00",
      600: "#8a5c00",
      700: "#614100",
      800: "#422c00",
      900: "#2e1f00",
    },
    success: {
      light: "#d8eedd",
      dark: "#285d33",
      main: "#228738",
      50: "#eaf6ec",
      100: "#d8eedd",
      200: "#a9dab4",
      300: "#7ec88e",
      400: "#3fa654",
      500: "#228738",
      600: "#267337",
      700: "#285d33",
      800: "#1f4727",
      900: "#122b18",
    },
    point: {
      main: "#d63d4a",
      light: "#d65c66", // 커스텀색상은 반드시 추가해줘야함
      dark: "#7a1f26",
      50: "#fbeff0",
      100: "#f5d6d9",
      200: "#ebadb2",
      300: "#e0858c",
      400: "#d65c66",
      500: "#d63d4a",
      600: "#ab2b36",
      700: "#7a1f26",
      800: "#521419",
      900: "#310c0f",
      contrastText: "#fff",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        disableElevation: true,
      },
      styleOverrides: {
        sizeXsmall: {
          minWidth: "unset",
          height: "28px",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          margin: 0,
          fontSize: 14,
          position: "absolute",
          bottom: 0,
          transform: "translate(0, 100%)",
        },
        error: ({ theme }) => ({
          color: theme.palette.error.main,
        }),
      },
    },
  },
});

export default theme;
