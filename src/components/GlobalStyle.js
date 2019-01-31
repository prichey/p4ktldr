import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  @import url('https://fonts.googleapis.com/css?family=Poppins:600,700|Volkhov:700');

  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    font-family: 'Poppins', sans-serif;
    color: ${props => props.theme.dark};
    font-size: 18px;

    @media (min-width: 550px) {
      font-size: 20px;
    }
  }

  html, body {
    height: 100%;
  }

  a {
    text-decoration: none;
    color: inherit;
    outline: none;

    &:focus {
      color: ${props => props.theme.accent};
    }

    &:hover {
      color: ${props => props.theme.accent};
    }
  }

  ul {
    list-style: none;
    padding: 0;
  }

  p a {
    color: ${props => props.theme.accent};
  }
`;

export default GlobalStyle;
