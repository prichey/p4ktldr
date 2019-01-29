import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { round } from 'lodash';

import Album from './Album';

import { getAlbumsByArtistId, getArtist } from './../utils/api';

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

function formatAlbumObj(albumObj) {
  return {
    name: albumObj.album.display_name,
    rating:
      albumObj.rating.display_rating === '10.0'
        ? 10
        : round(albumObj.rating.display_rating, 1).toFixed(1),
    year: albumObj.labels_and_years[0].year,
    photo:
      albumObj.album.photos.tout.sizes.list ||
      albumObj.album.photos.tout.sizes.homepageLarge ||
      albumObj.album.photos.tout.sizes.standard
  };
}

function formatAlbumList(list) {
  const albums = [];

  list.forEach(listItem => {
    if (
      'tombstone' in listItem &&
      'albums' in listItem.tombstone &&
      listItem.tombstone.albums.length > 0
    ) {
      listItem.tombstone.albums.forEach(album => {
        albums.push(formatAlbumObj(album));
      });
    }
  });

  return albums;
}

const getSortedAlbumsByArtistId = async id => {
  const albums = await getAlbumsByArtistId(id);
  return formatAlbumList(albums).sort((a, b) => b.rating - a.rating);
};

const Results = props => {
  const { artist, searchArtist, setArtist } = props;

  const [albums, setAlbums] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(
    () => {
      setFetching(true);
      if (!artist) {
        getArtist(searchArtist)
          .then(setArtist)
          .finally(() => setFetching(false));
      } else {
        getSortedAlbumsByArtistId(artist.id)
          .then(setAlbums)
          .finally(() => setFetching(false));
      }
      return null;
    },
    [artist, searchArtist]
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
