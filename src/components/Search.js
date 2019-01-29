import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Router, Redirect, navigate } from '@reach/router';

import Results from './Results';
import SearchForm from './SearchForm';
import Suggestions from './Suggestions';

import { getSuggestionsWithVal } from './../utils/api';

const StyledSearchSection = styled.section`
  // min-height: 400px;
`;

const initialState = {
  searchVal: '',
  suggestions: [],
  artist: null,
  fetching: false
};

const Search = props => {
  const [searchVal, setSearchVal] = useState(initialState.searchVal);
  const [artist, setArtist] = useState(initialState.artist);
  const [suggestions, setSuggestions] = useState(initialState.suggestions);
  const [fetching, setFetching] = useState(initialState.fetching);
  const inputRef = useRef();

  const { location } = props;

  const handleFormSubmit = e => {
    e.preventDefault();

    // follow the first suggestion
    // (not sure if this is correct behavior,
    // it just feels weird not to do anything on form submit)
    if (suggestions && suggestions.length > 0) {
      const suggestion = suggestions[0];
      navigate(`/search/${suggestion.name}`);
      setArtist(suggestion);
      console.log({ inputRef });
      try {
        inputRef.current.blur();
      } catch (err) {
        console.log('cant blur', err);
      }
    }
  };

  useEffect(
    () => {
      if (artist) {
        setSearchVal(artist.name);
      }
    },
    [artist]
  );

  useEffect(
    () => {
      if (location.state && location.state.reset) {
        setSearchVal(initialState.searchVal);
        setArtist(initialState.artist);
      }
    },
    [location]
  );

  useEffect(
    () => {
      if (location.pathname !== '/') {
        navigate('/');
      }

      // wait before setting fetching
      const timeout = setTimeout(() => {
        setFetching(true);
      }, 500);

      getSuggestionsWithVal(searchVal)
        .then(setSuggestions)
        .finally(() => {
          clearTimeout(timeout);
          setFetching(false);
        });
    },
    [searchVal]
  );

  return (
    <StyledSearchSection>
      <SearchForm
        searchVal={searchVal}
        handleSubmit={handleFormSubmit}
        handleInputChange={e => setSearchVal(e.target.value)}
        handleInputFocus={() => navigate('/')}
        inputRef={inputRef}
      />

      <Router primary={false}>
        <Suggestions
          path="/"
          suggestions={suggestions}
          searchVal={searchVal}
          setArtist={setArtist}
          setSearchVal={setSearchVal}
          fetching={fetching}
        />
        <Results
          path="/search/:searchArtist"
          artist={artist}
          setArtist={setArtist}
        />
        <Redirect default noThrow from="*" to="/" />
      </Router>
    </StyledSearchSection>
  );
};

export default Search;
