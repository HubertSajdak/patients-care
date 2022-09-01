import { Theme } from "@mui/material/styles";
import { CustomTheme } from "styles/theme";

declare module "@mui/material/styles" {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}
declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
