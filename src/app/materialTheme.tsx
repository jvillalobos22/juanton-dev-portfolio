"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#bd2d2d",
    },
    secondary: {
      main: "#2DBDBD",
    },
  },
  typography: {
    fontFamily: "Open Sans",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": ["Open Sans", "Domine"],
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
        },
      },
    },
  },
});

export default theme;
