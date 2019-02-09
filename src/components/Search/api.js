import fetch from 'node-fetch';
import * as lf from 'localforage';

import { hitIsNotTroll } from './utils';

const store = {
  suggestions: lf.createInstance({
    name: 'suggestions'
  }),
  albums: lf.createInstance({
    name: 'albums'
  })
};

export const getSuggestionsWithVal = async val => {
  if (!val) return [];

  const cacheHit = await store.suggestions.getItem(val);
  if (cacheHit && cacheHit.length) {
    if (hitIsNotTroll(cacheHit)) return cacheHit;

    // hit is troll, unset
    await store.suggestions.removeItem(val);
  }

  // `https://pitchfork.com/api/v2/search/_ac/?query=${val}`
  const result = await fetch(`/.netlify/functions/suggestions?query=${val}`)
    .then(res => res.json())
    .then(json => json.artists || [])
    .catch(err => []);

  if (!!result && result.length) {
    await store.suggestions.setItem(val, result);
  }

  return result;
};

export const getAlbumsByArtistId = async id => {
  if (!id) return [];

  const cacheHit = await store.albums.getItem(id);
  if (cacheHit && cacheHit.length) {
    if (hitIsNotTroll(cacheHit)) return cacheHit;

    // hit is troll, unset
    await store.albums.removeItem(id);
  }

  // `https://pitchfork.com/api/v2/entities/artists/${id}/albumreviews/?size=100&start=0`
  const result = await fetch(`/.netlify/functions/albums?id=${id}`)
    .then(res => res.json())
    .then(res => res.results.list || [])
    .catch(err => []);

  if (!!result && result.length) {
    await store.albums.setItem(id, result);
  }

  return result;
};

export const getArtist = async artistName => {
  const suggestions = await getSuggestionsWithVal(artistName).then(
    allSuggestions => allSuggestions.filter(artist => artist.id)
  );

  return suggestions.length ? suggestions[0] : null;
};
