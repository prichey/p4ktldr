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
    color: #ec2227;
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
