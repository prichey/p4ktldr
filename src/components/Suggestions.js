import React from 'react';

import Suggestion from './Suggestion';

const Suggestions = ({
  suggestions,
  searchVal,
  setArtist,
  setSearchVal,
  fetching
}) => {
  if (!!fetching) {
    return <p>Fetching results...</p>;
  }

  // we have suggestions, show them
  if (suggestions && suggestions.length > 0) {
    return (
      <ul>
        {suggestions.map((suggestion, i) => (
          <Suggestion
            suggestion={suggestion}
            key={suggestion.id}
            index={i}
            setArtist={setArtist}
            setSearchVal={setSearchVal}
          />
        ))}
      </ul>
    );
  }

  // no suggestions and searchVal is not empty
  if (searchVal !== '') {
    return <p>Artist "{searchVal}" could not be found.</p>;
  }

  return null;
};

export default Suggestions;
