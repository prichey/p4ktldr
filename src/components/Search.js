import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import SuggestionList from './SuggestionList';
import SearchForm from './SearchForm';

import { getSuggestionsWithVal } from './../utils/api';

const StyledSearchSection = styled.section`
  // min-height: 400px;
`;

class Search extends React.Component {
  state = {
    searchVal: '',
    suggestions: [],
    focusedElementIndex: null,
    shiftDown: false
  };

  searchInput = null;

  incrementFocusedIndex = () => {
    const { focusedElementIndex, suggestions } = this.state;
    if (suggestions.length === 0) {
      this.setState({
        focusedElementIndex: null
      });
    } else if (
      focusedElementIndex === null ||
      focusedElementIndex >= suggestions.length - 1
    ) {
      this.setState({
        focusedElementIndex: 0
      });
    } else {
      this.setState({
        focusedElementIndex: focusedElementIndex + 1
      });
    }
  };

  decrementFocusedIndex = () => {
    const { focusedElementIndex, suggestions } = this.state;

    if (suggestions.length === 0) {
      this.setState({
        focusedElementIndex: null
      });
    } else if (focusedElementIndex === null || focusedElementIndex <= 0) {
      this.setState({
        focusedElementIndex: suggestions.length - 1
      });
    } else {
      this.setState({
        focusedElementIndex: focusedElementIndex - 1
      });
    }
  };

  handleKeyDown = e => {
    switch (e.keyCode) {
      case 9: // tab
        e.preventDefault();
        if (this.state.shiftDown === true) {
          this.decrementFocusedIndex();
        } else {
          this.incrementFocusedIndex();
        }
        break;
      case 40: // down arrow
        e.preventDefault();
        this.incrementFocusedIndex();
        break;
      case 38: // up arrow
        e.preventDefault();
        this.decrementFocusedIndex();
        break;
      case 16: // shift
        this.setState({
          shiftDown: true
        });
        break;
      default:
        return;
    }
  };

  handleKeyUp = e => {
    switch (e.keyCode) {
      case 16: // shift
        this.setState({
          shiftDown: false
        });
        break;
      default:
        return;
    }
  };

  handleArtistUpdate = artist => {
    if (!artist.trim().length) {
      this.setState({
        searchVal: '',
        suggestions: []
      });

      return;
    }

    this.setState({
      searchVal: artist
    });

    getSuggestionsWithVal(artist)
      .then(suggestions => {
        this.setState({
          suggestions: suggestions,
          focusedElementIndex: null
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleInputChange = e => {
    this.handleArtistUpdate(e.target.value);
  };

  handleSubmit = e => {
    const { suggestions, focusedElementIndex } = this.state;
    const { history } = this.props;

    e.preventDefault();

    if (focusedElementIndex !== null) {
      const selectedSuggestion = suggestions[focusedElementIndex];
      history.push(`/search/${selectedSuggestion.name}`, {
        artist: selectedSuggestion
      });
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (state.searchVal === '' && props.location && props.location.state) {
      return props.location.state;
    }

    return null;
  }

  render() {
    const { searchVal, suggestions, focusedElementIndex } = this.state;

    // console.log('search render');

    return (
      <StyledSearchSection>
        <SearchForm
          searchVal={searchVal}
          handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange}
          handleKeyUp={this.handleKeyUp}
          handleKeyDown={this.handleKeyDown}
          inputRef={el => (this.searchInput = el)}
        />

        {suggestions.length > 0 && (
          <SuggestionList
            suggestions={suggestions}
            incrementFocusedIndex={this.incrementFocusedIndex}
            decrementFocusedIndex={this.decrementFocusedIndex}
            focusedElementIndex={focusedElementIndex}
          />
        )}
      </StyledSearchSection>
    );
  }
}

export default withRouter(Search);
