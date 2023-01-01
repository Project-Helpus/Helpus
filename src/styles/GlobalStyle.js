import { createGlobalStyle } from "styled-components";
import normalize from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  ${normalize}

  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;  
    font-family: Roboto, Arial ,sans-serif;   
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
