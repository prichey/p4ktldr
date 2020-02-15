import AbortController from 'abort-controller';
import fetch from 'isomorphic-unfetch';

const abortController = new AbortController();

export const getSuggestionsWithVal = async val => {
  if (!val) return [];

  // `https://pitchfork.com/api/v2/search/_ac/?query=${val}`
  const result = await fetch(`/.netlify/functions/suggestions?query=${val}`, {
    signal: abortController.signal
  })
    .then(res => res.json())
    .then(json => json.artists || [])
    .catch(err => []);

  return result;
};

export const getAlbumsByArtistId = async id => {
  if (!id) return [];

  // `https://pitchfork.com/api/v2/entities/artists/${id}/albumreviews/?size=100&start=0`
  const result = await fetch(`/.netlify/functions/albums?id=${id}`, {
    signal: abortController.signal
  })
    .then(res => res.json())
    .then(res => res.results.list || [])
    .catch(err => []);

  return result;
};

export const getArtist = async artistName => {
  const suggestions = await getSuggestionsWithVal(artistName).then(
    allSuggestions => allSuggestions.filter(artist => artist.id)
  );

  return suggestions.length ? suggestions[0] : null;
};
