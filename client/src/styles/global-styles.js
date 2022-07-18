import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body,html{
    font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
    font-size: 10px;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input, button {
    margin: 0;
    padding: 0;
    background-color: transparent;
    border: none;
    outline: none;
    
  }
  h1, h2, h3, h4, h5, h6{
    font-family:'Maven Pro', sans-serif;
  }
  ol, ul, li {
    list-style: none;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width:759px) {
    body, html {
      font-size: 5px;
    }
  }
`;

export default GlobalStyle;
