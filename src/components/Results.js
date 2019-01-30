import React, { useEffect } from 'react';
import styled from 'styled-components';

import Album from './Album';

const StyledResults = styled.div`
  margin-bottom: 20px;

  @media (min-width: 550px) {
    margin-bottom: 50px;
  }
`;

const StyledResultsList = styled.ul`
  padding: 0;
`;

// const StyledArtistHeading = styled.h2`
//   font-size: 18px;
//
//   @media (min-width: 550px) {
//     font-size: 32px;
//   }
// `;

const Results = ({ fetching, albums, setSearchVal, searchArtist }) => {
  useEffect(
    () => {
      setSearchVal(searchArtist);
    },
    [searchArtist]
  );

  return (
    <StyledResults>
      {!!fetching ? (
        <p>Fetching albums...</p>
      ) : albums && albums.length > 0 ? (
        <StyledResultsList>
          {albums.map((album, i) => <Album album={album} key={i} />)}
        </StyledResultsList>
      ) : (
        <p>No albums could be found.</p>
      )}
    </StyledResults>
  );
};

export default Results;
