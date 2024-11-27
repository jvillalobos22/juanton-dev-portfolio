"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#911B2E",
    },
    secondary: {
      main: "#2DBDBD",
    },
  },
  typography: {
    fontFamily: ["Open Sans", "Domine"].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          height: 52,
          fontSize: 18,
        },
        colorPrimary: "#911B2E",
      },
    },
  },
});

export default theme;
