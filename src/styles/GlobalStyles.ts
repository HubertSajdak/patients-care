import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
*,*::before,*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  font-family: "Roboto", sans-serif;
}
body{
background-color: #f5f5f5;
}
a {
  text-decoration: none;
}
`;
