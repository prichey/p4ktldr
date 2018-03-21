import React from 'react';
import fetch from 'node-fetch';
import styled from 'styled-components';

import { round } from 'lodash';

const StyledResults = styled.div``;

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

class Results extends React.Component {
  state = {
    artist: null,
    albums: null
  };

  componentWillMount() {
    console.log('this.props will', this.props);
    if (!this.props.location.state) return null;
    this.setState({ ...this.props.location.state });
  }

  componentDidMount() {
    if (!this.props.location.state) return;

    fetch(
      `https://pitchfork.com/api/v2/entities/artists/${
        this.props.location.state.artist.id
      }/albumreviews/?size=100&start=0`
    )
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({
          albums: formatAlbumList(res.results.list).sort(
            (a, b) => b.rating - a.rating
          )
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { artist, albums } = this.state;

    if (!artist) return null;

    return (
      <StyledResults>
        <h2>{artist.name}</h2>
        <ul>
          {albums &&
            albums.map((album, i) => (
              <li key={i}>
                <span>{`${album.name} (${album.year}): ${album.rating}`}</span>
                {/* <img src={album.photo} alt={album.name} /> */}
              </li>
            ))}
        </ul>
      </StyledResults>
    );
  }
}

export default Results;
