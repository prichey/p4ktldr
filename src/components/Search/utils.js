import { round, unescape } from 'lodash';
import * as urlJoin from 'url-join';

import { getAlbumsByArtistId } from './api';

export const hitIsNotTroll = ([hit, ...rest]) => {
  if (rest.length) return true; // troll responses have length 1

  const bandIsJet = 'name' in hit && hit.name === 'Jet';
  const albumIsShineOn = 'title' in hit && hit.title === 'Shine On';
  return !(bandIsJet || albumIsShineOn);
};

export const getSearchFromPathname = str => {
  if (typeof str === 'string') {
    const search = str.split('/').filter(Boolean)[1];
    if (search) {
      return decodeURI(search);
    }
  }

  return null;
};

const formatAlbumObj = (albumObj, url) => {
  return {
    name: albumObj.album.display_name,
    rating:
      albumObj.rating.display_rating === '10.0'
        ? 10
        : round(albumObj.rating.display_rating, 1).toFixed(1),
    year: albumObj.labels_and_years[0].year,
    bestNew: albumObj.rating.bnm || albumObj.rating.bnr,
    photo:
      albumObj.album.photos.tout.sizes.list ||
      albumObj.album.photos.tout.sizes.homepageLarge ||
      albumObj.album.photos.tout.sizes.standard,
    url: urlJoin('https://pitchfork.com/', url)
  };
};

const formatAlbumList = list => {
  const albums = [];

  list.forEach(listItem => {
    if (
      'tombstone' in listItem &&
      'albums' in listItem.tombstone &&
      listItem.tombstone.albums.length > 0
    ) {
      listItem.tombstone.albums.forEach(album => {
        albums.push(formatAlbumObj(album, listItem.url));
      });
    }
  });

  return albums;
};

export const getSortedAlbumsByArtistId = async id => {
  const albums = await getAlbumsByArtistId(id);
  return formatAlbumList(albums).sort((a, b) => b.rating - a.rating);
};

export const getSortedAlbums = (albums = []) => {
  return formatAlbumList(albums).sort((a, b) => b.rating - a.rating);
};
