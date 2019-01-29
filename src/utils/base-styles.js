import { injectGlobal } from 'styled-components';
import normalize from 'styled-normalize';

export default () => {
  injectGlobal`
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
      color: #474748;
    }

    html, body {
      height: 100%;
    }

    a {
      text-decoration: none;
      color: inherit;
      outline: none;

      &:focus {
        color: #ec2227;
      }
    }

    ul {
      list-style: none;
      padding: 0;
    }

    p a {
      color: #ec2227
    }
  `;
};
