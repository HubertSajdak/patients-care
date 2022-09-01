import { createTheme } from "@mui/material";

export interface CustomTheme {
  border: {
    borderRadius: string;
  };
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#2667ff",
    },
  },

  border: {
    borderRadius: "0.25rem",
  },
});
export default theme;
