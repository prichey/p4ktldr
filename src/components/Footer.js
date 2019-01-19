import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';

const StyledFooter = styled.footer`
  text-align: right;
  padding-bottom: 20px;

  @media (min-width: 550px) {
    padding-bottom: 50px;
  }
`;

class Footer extends React.Component {
  render() {
    const isAboutPage = this.props.location.pathname === '/about';

    return (
      <StyledFooter>
        {isAboutPage ? (
          <Link to="/">Back</Link>
        ) : (
          <Link to="/about">About</Link>
        )}
      </StyledFooter>
    );
  }
}

export default withRouter(Footer);
