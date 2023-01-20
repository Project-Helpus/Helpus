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
    font-family: "Malgun Gothic","맑은 고딕",helvetica,"Apple SD Gothic Neo",sans-serif;  
  }

  button {
    cursor: pointer;
  }

  input, textarea {
    border: 0.5px solid ${(props) => props.theme.colors.lightGray};
    border-radius: 10px;
    padding: 15px 20px;
    font-size: 16px;
    &: focus {
      outline: none;
    }
  }
`;

export default GlobalStyle;
