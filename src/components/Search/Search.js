import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Router, Redirect, navigate } from '@reach/router';
import ReactGA from 'react-ga';

import Results from '../Results';
import SearchForm from '../SearchForm';
import Suggestions from '../Suggestions';

import { useSuggestions } from './api';

import { getSearchFromPathname } from './utils';

const initialState = {
  searchVal: '',
  artistId: undefined
};

const SearchContext = React.createContext(initialState);

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

// const initialState = {
//   searchVal: '',
//   suggestions: [],
//   artist: null,
//   fetching: false,
//   albums: []
// };

const Search = ({ location }) => {
  const [searchVal, setSearchVal] = useState(initialState.searchVal);
  const [artistId, setArtistId] = useState(null);

  const { suggestions, isLoading } = useSuggestions(searchVal);

  // const [artist, setArtist] = useState(initialState.artist);
  // const [suggestions, setSuggestions] = useState(initialState.suggestions);
  // const [albums, setAlbums] = useState(initialState.albums);
  // const [artistFetching, setArtistFetching] = useState(initialState.fetching);
  // const [suggestionsFetching, setSuggestionsFetching] = useState(
  //   initialState.fetching
  // );

  const inputRef = useRef();

  const handleFormSubmit = useCallback(
    e => {
      e.preventDefault();

      // follow the first suggestion
      // (not sure if this is correct behavior,
      // it just feels weird not to do anything on form submit)
      if (suggestions && suggestions.length > 0) {
        const suggestion = suggestions[0];
        navigate(`/search/${suggestion.name}`);
        setArtistId(suggestion.id);
        inputRef.current && inputRef.current.blur();
      }
    },
    [suggestions]
  );

  const resetState = () => {
    setSearchVal(initialState.searchVal);
    setArtistId(initialState.artistId);
  };

  useEffect(() => {
    if (!location || !location.pathname) return;

    if (location.state && location.state.reset) {
      resetState();
    }

    ReactGA.pageview(location.pathname);
  }, [location]);

  useEffect(() => {
    if (!location || !location.pathname) return;

    const search = getSearchFromPathname(location.pathname);
    if (search && search !== searchVal) {
      setSearchVal(search);
    }
  }, [location, searchVal]);

  // useEffect(() => {
  //   if (searchVal === '') {
  //     setArtist(initialState.artist);
  //     setSuggestions(initialState.suggestions);

  //     return;
  //   }

  //   if (location.pathname !== '/') {
  //     setArtistFetching(true);
  //     getArtist(searchVal)
  //       .then(setArtist)
  //       .finally(() => setArtistFetching(false));
  //   }

  //   setSuggestionsFetching(true);
  //   getSuggestionsWithVal(searchVal)
  //     .then(setSuggestions)
  //     .finally(() => {
  //       setSuggestionsFetching(false);
  //     });
  // }, [searchVal]);

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
        <SearchContext.Provider
          value={{
            searchVal,
            setSearchVal,
            artistId,
            setArtistId
          }}
        >
          <Router primary={false}>
            <Suggestions
              path="/"
              suggestions={suggestions}
              isLoading={isLoading}
              // setArtist={setArtist}
              // fetching={suggestionsFetching}
            />
            <Results
              path="/search/:searchArtist"
              suggestions={suggestions}
              // fetching={artistFetching}
              // setArtist={setArtist}
              // setSearchVal={setSearchVal}
              // albums={albums}
            />
            <Redirect default noThrow from="*" to="/" />
          </Router>
        </SearchContext.Provider>
      </StyledSearchLower>
    </div>
  );
};

export { SearchContext };
export default Search;
