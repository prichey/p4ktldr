import fetch from 'node-fetch';

export const getSuggestionsWithVal = async val => {
  if (val.length === 0) return [];

  return fetch(`https://pitchfork.com/api/v2/search/_ac/?query=${val}`)
    .then(res => res.json())
    .then(json => {
      return json.artists;
    });
};

export const getAlbumsByArtistId = async (id, count = 100, start = 0) => {
  return fetch(
    `https://pitchfork.com/api/v2/entities/artists/${id}/albumreviews/?size=${count}&start=${0}`
  )
    .then(res => res.json())
    .then(res => res.results.list);
};

export const getArtist = async artistName => {
  const suggestions = await getSuggestionsWithVal(artistName).then(
    allSuggestions => allSuggestions.filter(artist => artist.id)
  );

  return suggestions.length ? suggestions[0] : null;
};
