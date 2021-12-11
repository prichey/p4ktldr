import React, { useEffect, useState, useContext } from 'react';

import Suggestion from './Suggestion';
import { SearchContext } from './Search';

const DelayedNode = ({ elem, ms = 50 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, ms);
    return () => clearTimeout(timeout);
  }, []);

  return isVisible ? elem : null;
};

const Suggestions = ({ suggestions = [], isLoading = false }) => {
  const { searchVal } = useContext(SearchContext);

  if (isLoading) {
    return <DelayedNode elem={<p>Fetching results...</p>} />;
  }

  // we have suggestions, show them
  if (suggestions && suggestions.length > 0) {
    return (
      <ul>
        {suggestions.map(suggestion => (
          <Suggestion suggestion={suggestion} key={suggestion.id} />
        ))}
      </ul>
    );
  }

  // no suggestions and searchVal is not empty
  if (searchVal !== '') {
    return (
      <DelayedNode elem={<p>Artist "{searchVal}" could not be found.</p>} />
    );
  }

  return null;
};

export default Suggestions;
