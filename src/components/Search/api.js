import fetch from 'node-fetch';
import * as lf from 'localforage';

const store = {
  suggestions: lf.createInstance({
    name: 'suggestions'
  }),
  albums: lf.createInstance({
    name: 'albums'
  }),
  artists: lf.createInstance({
    name: 'artists'
  })
};

export const getSuggestionsWithVal = async val => {
  if (val.length === 0) return [];

  const cacheHit = await store.suggestions.getItem(val);
  if (!!cacheHit) return cacheHit;

  // `https://pitchfork.com/api/v2/search/_ac/?query=${val}`
  const result = await fetch(`/.netlify/functions/suggestions?query=${val}`)
    .then(res => res.json())
    .then(json => json.artists || [])
    .catch(err => []);

  await store.suggestions.setItem(val, result);
  return result;
};

export const getAlbumsByArtistId = async id => {
  const hashKey = JSON.stringify(id);

  const cacheHit = await store.albums.getItem(hashKey);
  if (!!cacheHit) return cacheHit;

  // `https://pitchfork.com/api/v2/entities/artists/${id}/albumreviews/?size=100&start=0`
  const result = await fetch(`/.netlify/functions/albums?id=${id}`)
    .then(res => res.json())
    .then(res => res.results.list || [])
    .catch(err => []);

  await store.albums.setItem(hashKey, result);
  return result;
};

export const getArtist = async artistName => {
  const cacheHit = await store.artists.getItem(artistName);
  if (!!cacheHit) return cacheHit;

  const suggestions = await getSuggestionsWithVal(artistName).then(
    allSuggestions => allSuggestions.filter(artist => artist.id)
  );

  const result = suggestions.length ? suggestions[0] : null;

  await store.artists.setItem(artistName, result);
  return result;
};
