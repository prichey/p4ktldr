import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

import { unescape } from 'lodash';

const StyledSuggestion = styled.li`
  margin-bottom: 0.5em;
  font-size: 18px;
`;

const StyledSuggestionLink = styled(Link)`
  text-decoration: none;
  color: #474748;

  &:hover {
    color: #ec2227;
  }

  &:focus {
    outline: none;
  }
`;

const StyledFocusedSuggestionLink = styled(StyledSuggestionLink)`
  color: #ec2227;
`;

class Suggestion extends React.Component {
  render() {
    const { suggestion, focused } = this.props;

    return (
      <StyledSuggestion>
        {focused ? (
          <StyledFocusedSuggestionLink
            to={`/search/${suggestion.name}`}
            state={{ artist: suggestion }}
          >
            {unescape(suggestion.name)}
          </StyledFocusedSuggestionLink>
        ) : (
          <StyledSuggestionLink
            to={`/search/${suggestion.name}`}
            state={{ artist: suggestion }}
          >
            {unescape(suggestion.name)}
          </StyledSuggestionLink>
        )}
      </StyledSuggestion>
    );
  }
}

export default Suggestion;
