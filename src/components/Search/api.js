import AbortController from 'abort-controller';
import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';

import { getSortedAlbums } from './utils';

const abortController = new AbortController();
const fetcher = (...args) => fetch(...args).then(res => res.json());

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

export const useSuggestions = val => {
  // `https://pitchfork.com/api/v2/search/_ac/?query=${val}`
  const { data, error } = useSWR(
    () => `/.netlify/functions/suggestions?query=${val}`,
    fetcher
  );

  const ret = {
    suggestions: [],
    isLoading: !error && !data,
    isError: error
  };

  if (!val) {
    return {
      ...ret,
      isLoading: false,
      isError: undefined
    };
  }

  if (data) {
    return {
      ...ret,
      suggestions: data.artists || []
    };
  }

  return ret;
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
  // const suggestions = await getSuggestionsWithVal(artistName).then(
  //   allSuggestions => allSuggestions.filter(artist => artist.id)
  // );

  // return suggestions.length ? suggestions[0] : null;
  return null;
};

export const useArtistAlbums = artistId => {
  // `https://pitchfork.com/api/v2/search/_ac/?query=${val}`
  const { data, error } = useSWR(
    () => (artistId ? `/.netlify/functions/albums?id=${artistId}` : null),
    fetcher
  );

  const ret = {
    artist: null,
    isLoading: !error && !data,
    isError: error
  };

  if (data && data.results) {
    return {
      ...ret,
      albums: getSortedAlbums(data.results.list ?? [])
    };
  }

  return ret;
};
