import React, { useContext } from 'react';
import { unescape } from 'lodash';

import { StyledSuggestion, StyledSuggestionLink } from './styled-suggestion';
import { SearchContext } from '../Search';

const Suggestion = ({ suggestion }) => {
  const { setSearchVal, setArtistId } = useContext(SearchContext);

  return (
    <StyledSuggestion>
      <StyledSuggestionLink
        to={`/search/${encodeURIComponent(suggestion.name)}`}
        onClick={() => {
          setArtistId(suggestion.id);
          setSearchVal(suggestion.name);
        }}
      >
        {unescape(suggestion.name)}
      </StyledSuggestionLink>
    </StyledSuggestion>
  );
};

export default Suggestion;
