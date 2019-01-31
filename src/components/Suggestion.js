import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

import { unescape } from 'lodash';

const StyledSuggestion = styled.li`
  margin-bottom: 0.5em;
  font-size: 18px;

  @media (min-width: 550px) {
    font-size: 20px;
  }
`;

const StyledSuggestionLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.dark};

  &:hover {
    color: ${props => props.theme.accent};
  }

  &:focus {
    color: ${props => props.theme.accent};
    outline: none;
  }
`;

const Suggestion = ({ suggestion, setArtist, setSearchVal }) => {
  return (
    <StyledSuggestion>
      <StyledSuggestionLink
        to={`/search/${encodeURIComponent(suggestion.name)}`}
        onClick={() => {
          setArtist(suggestion);
          setSearchVal(suggestion.name);
        }}
      >
        {unescape(suggestion.name)}
      </StyledSuggestionLink>
    </StyledSuggestion>
  );
};

export default Suggestion;
