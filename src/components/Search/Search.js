import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Router, Redirect, navigate } from '@reach/router';
import ReactGA from 'react-ga';

import Results from '../Results';
import SearchForm from '../SearchForm';
import Suggestions from '../Suggestions';

import { getArtist, getSuggestionsWithVal } from './api';
import { getSortedAlbumsByArtistId } from './utils';

const StyledSearchLower = styled.div`
  margin: 20px 0;

  @media (min-width: ${props => props.theme.bp.mobile}) {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  @media (min-width: ${props => props.theme.bp.big}) {
    margin-top: 40px;
    margin-bottom: 40px;
  }
`;

const initialState = {
  searchVal: '',
  suggestions: [],
  artist: null,
  fetching: false,
  albums: []
};

const Search = ({ location }) => {
  const [searchVal, setSearchVal] = useState(initialState.searchVal);
  const [artist, setArtist] = useState(initialState.artist);
  const [suggestions, setSuggestions] = useState(initialState.suggestions);
  const [albums, setAlbums] = useState(initialState.albums);
  const [artistFetching, setArtistFetching] = useState(initialState.fetching);
  const [suggestionsFetching, setSuggestionsFetching] = useState(
    initialState.fetching
  );

  const inputRef = useRef();

  const handleFormSubmit = e => {
    e.preventDefault();

    // follow the first suggestion
    // (not sure if this is correct behavior,
    // it just feels weird not to do anything on form submit)
    if (suggestions && suggestions.length > 0) {
      const suggestion = suggestions[0];
      navigate(`/search/${suggestion.name}`);
      setArtist(suggestion);
      inputRef.current && inputRef.current.blur();
    }
  };

  const resetState = () => {
    setSearchVal(initialState.searchVal);
    setArtist(initialState.artist);
    setSuggestions(initialState.suggestions);
    setAlbums(initialState.albums);
    setArtistFetching(initialState.fetching);
    setSuggestionsFetching(initialState.fetching);
  };

  useEffect(
    () => {
      if (artist) {
        setSearchVal(artist.name);

        setArtistFetching(true);
        getSortedAlbumsByArtistId(artist.id)
          .then(albums => {
            setAlbums(albums);
          })
          .finally(() => setArtistFetching(false));
      }
    },
    [artist]
  );

  useEffect(
    () => {
      if (!location) return;

      if (location.state && location.state.reset) {
        resetState();
      }

      ReactGA.pageview(location.pathname);
    },
    [location]
  );

  useEffect(
    () => {
      if (searchVal === '') {
        setArtist(initialState.artist);
        setSuggestions(initialState.suggestions);

        return;
      }

      if (location.pathname !== '/') {
        setArtistFetching(true);
        getArtist(searchVal)
          .then(setArtist)
          .finally(() => setArtistFetching(false));
      }

      // wait before setting fetching
      const timeout = setTimeout(() => {
        setSuggestionsFetching(true);
      }, 500);

      getSuggestionsWithVal(searchVal)
        .then(setSuggestions)
        .finally(() => {
          clearTimeout(timeout);
          setSuggestionsFetching(false);
        });
    },
    [searchVal]
  );

  return (
    <div>
      <SearchForm
        searchVal={searchVal}
        handleSubmit={handleFormSubmit}
        handleInputChange={e => setSearchVal(e.target.value)}
        handleInputFocus={() => location.path !== '/' && navigate('/')}
        resetSearchState={() => {
          location.path !== '/' && navigate('/');
          resetState();
        }}
        inputRef={inputRef}
      />

      <StyledSearchLower>
        <Router primary={false}>
          <Suggestions
            path="/"
            suggestions={suggestions}
            searchVal={searchVal}
            setArtist={setArtist}
            setSearchVal={setSearchVal}
            fetching={suggestionsFetching}
          />
          <Results
            path="/search/:searchArtist"
            fetching={artistFetching}
            setArtist={setArtist}
            setSearchVal={setSearchVal}
            albums={albums}
          />
          <Redirect default noThrow from="*" to="/" />
        </Router>
      </StyledSearchLower>
    </div>
  );
};

export default Search;
