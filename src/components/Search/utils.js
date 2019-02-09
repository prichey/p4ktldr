import { round } from 'lodash';
import * as urlJoin from 'url-join';

import { getAlbumsByArtistId } from './api';

const bandIsJet = band => 'name' in band && band.name === 'Jet';
const albumIsShineOn = album => 'title' in album && album.title === 'Shine On';

export const hitIsNotTroll = ([hit, ...rest]) => {
  if (rest.length) return true; // troll responses only have length 1
  return !(bandIsJet || albumIsShineOn);
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
