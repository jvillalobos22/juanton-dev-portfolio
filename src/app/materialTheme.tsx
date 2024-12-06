"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#911B2E",
      light: "#B62238",
      dark: "#741625",
      contrastText: "#FDF9F9",
    },
    secondary: {
      main: "#225252",
      light: "#DCF2F1",
      dark: "#1D4140",
      contrastText: "#F5FBFB",
    },
    contrastThreshold: 7.0,
  },
  typography: {
    fontFamily: ["Open Sans", "Domine"].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          height: 44,
          fontSize: 18,
          fontWeight: 700,
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
