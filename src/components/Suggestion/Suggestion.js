import React from 'react';
import { unescape } from 'lodash';

import { StyledSuggestion, StyledSuggestionLink } from './styled-suggestion';

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
