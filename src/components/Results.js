import React from 'react';
import styled from 'styled-components';
import LazyLoad from 'react-lazy-load';
import { round } from 'lodash';
import { navigate } from '@reach/router';

import SearchForm from './SearchForm';

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

const StyledResult = styled.li`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1em;
  font-size: 14px;

  @media (min-width: 550px) {
    font-size: 18px;
  }
`;

// const StyledArtistHeading = styled.h2`
//   font-size: 18px;
//
//   @media (min-width: 550px) {
//     font-size: 32px;
//   }
// `;

const StyledAlbumArtWrap = styled.div`
  width: 40px;
  flex-shrink: 0;
  font-size: 12px;

  @media (min-width: 550px) {
    width: 60px;
  }

  img {
    width: 100%;
  }
`;

const StyledRatingWrap = styled.div`
  padding-left: 1em;
  // display: flex;
  // flex-direction: column;
  // justify-content: space-around;

  & > * {
    margin-bottom: 0.5em;
  }
`;

const StyledAlbumTitle = styled.span``;
const StyledAlbumYear = styled.span`
  &:before {
    content: ' (';
  }

  &:after {
    content: ')';
  }
`;
const StyledAlbumRating = styled.span`
  display: block;
  color: #ec2227;
`;

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

const getArtistFromProps = async props => {
  const { location, match } = props;

  if (location && location.state && location.state.artist)
    return location.state.artist;

  if (match && match.params.artist) return getArtist(match.params.artist);

  return null;
};

const getSortedAlbumsByArtistId = async id => {
  const albums = await getAlbumsByArtistId(id);
  return formatAlbumList(albums).sort((a, b) => b.rating - a.rating);
};

const getArtistAndAlbumsFromProps = async props => {
  try {
    const artist = await getArtistFromProps(props);
    const albums = await getSortedAlbumsByArtistId(artist.id);
    return { artist, albums };
  } catch (err) {
    console.log(err);
  }
};

class Results extends React.Component {
  state = {
    artist: null,
    albums: null
  };

  handleInputFocus = e => {
    // const { history } = this.props;

    // const pushObj = {
    //   searchVal: this.state.artist.name
    // };

    // history.push('/', pushObj);
    // history.push('/');
    navigate('/');
  };

  componentDidMount() {
    getArtistAndAlbumsFromProps(this.props).then(res => {
      this.setState(res);
    });
  }

  render() {
    const { artist, albums } = this.state;

    if (!artist) {
      return null;
    }

    return (
      <StyledResults>
        <SearchForm
          redirectOnFocus={true}
          searchVal={artist.name}
          handleFocus={this.handleInputFocus}
        />
        {!!albums ? (
          albums.length > 0 ? (
            <StyledResultsList>
              {albums.map((album, i) => (
                <StyledResult key={i}>
                  <StyledAlbumArtWrap>
                    <LazyLoad height={60}>
                      <img src={album.photo} alt={album.name} />
                    </LazyLoad>
                  </StyledAlbumArtWrap>

                  <StyledRatingWrap>
                    <div>
                      <StyledAlbumTitle>{album.name}</StyledAlbumTitle>
                      {album.year && (
                        <StyledAlbumYear>{album.year}</StyledAlbumYear>
                      )}
                    </div>

                    <div>
                      <StyledAlbumRating>{album.rating}</StyledAlbumRating>
                    </div>
                  </StyledRatingWrap>
                </StyledResult>
              ))}
            </StyledResultsList>
          ) : (
            <p>No albums could be found.</p>
          )
        ) : (
          <p>Loading...</p>
        )}
      </StyledResults>
    );
  }
}

export default Results;
