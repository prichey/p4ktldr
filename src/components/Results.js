import React, { useEffect, Fragment } from 'react';

import Album from './Album';

const Results = ({ fetching, albums, setSearchVal, searchArtist }) => {
  useEffect(
    () => {
      setSearchVal(searchArtist);
    },
    [searchArtist]
  );

  return (
    <Fragment>
      {!!fetching ? (
        <p>Fetching albums...</p>
      ) : albums && albums.length > 0 ? (
        <ul>{albums.map((album, i) => <Album album={album} key={i} />)}</ul>
      ) : (
        <p>No albums could be found.</p>
      )}
    </Fragment>
  );
};

export default Results;
