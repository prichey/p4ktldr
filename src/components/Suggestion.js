import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { unescape } from 'lodash';

const StyledSuggestion = styled.li`
  margin-bottom: 0.5em;
  font-size: 18px;
`;

const StyledSuggestionLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: #ec2227;
  }

  &:focus {
    color: #ec2227;
    outline: none;
  }
`;

class Suggestion extends React.Component {
  render() {
    const { suggestion } = this.props;

    console.log(suggestion);

    return (
      <StyledSuggestion>
        <StyledSuggestionLink
          to={{
            pathname: `/search/${suggestion.name}`,
            state: { artist: suggestion }
          }}>
          {unescape(suggestion.name)}
        </StyledSuggestionLink>
      </StyledSuggestion>
    );
  }
}

export default Suggestion;
