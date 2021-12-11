import React, { useContext, useMemo } from 'react';

import Album from './Album';
import { SearchContext, useArtistAlbums } from './Search';

const Results = ({ suggestions = [] }) => {
  const { artistId } = useContext(SearchContext);

  const artistIdFromSuggestions = useMemo(() => {
    if (Array.isArray(suggestions) && suggestions.length > 0) {
      const artist = suggestions[0];
      if (artist.id) {
        return artist.id;
      }
    }

    return null;
  }, [suggestions]);

  // if no artistId, guess from first artist suggestion
  const { albums, isLoading } = useArtistAlbums(
    artistId ?? artistIdFromSuggestions
  );

  if (isLoading) {
    return <p>Fetching albums...</p>;
  }

  if (albums && albums.length > 0) {
    return (
      <ul>
        {albums.map((album, i) => (
          <Album album={album} key={i} />
        ))}
      </ul>
    );
  }

  return <p>No reviews could be found.</p>;
};

export default Results;
