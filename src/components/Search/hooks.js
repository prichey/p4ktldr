import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';

import { getSortedAlbums } from './utils';

const fetcher = (...args) => fetch(...args).then(res => res.json());

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
