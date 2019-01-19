import React from 'react';
import styled from 'styled-components';
import fetch from 'node-fetch';
import Promise from 'bluebird';
import { withRouter } from 'react-router-dom';

import SuggestionList from './SuggestionList';

import search from './../img/search.svg';

const StyledSearchSection = styled.section`
  // min-height: 400px;
`;

const StyleSearchForm = styled.form`
  border-bottom: 3px solid ${props => (props.focus ? '#474748' : '#d1d3d4')};
  transition: border-color 150ms;
  margin: 0.75em 0;
  position: relative;
  font-size: 36px;
  font-family: 'Volkhov', serif;

  &:after {
    display: ${props => (props.focus || !props.empty ? 'none' : 'block')};
    content: url(${search});
    position: absolute;
    right: 0;
    top: 50%;
    width: 15%;
    max-width: 30px;
    transform: translateY(-50%);
  }

  @media (min-width: 550px) {
    margin: 1em 0 0.5em;
    font-size: 72px;

    &:after {
      max-width: 45px;
    }
  }
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  line-height: 1.5em;
  color: #474748;

  &:focus {
    outline: none;
    border-color: #474748;

    &::placeholder {
      visibility: hidden;
    }
  }

  &::placeholder {
    color: #d1d3d4;
  }
`;

const StyledTextUnderline = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  max-width: 100%;
  visibility: hidden;
  height: 0;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 3px;
    background: #ec2227;
    width: 100%;
    visibility: visible;
  }
`;

const getSuggestionsWithVal = val => {
  if (val.length === 0) return Promise.resolve([]);

  return fetch(`https://pitchfork.com/api/v2/search/_ac/?query=${val}`)
    .then(res => res.json())
    .then(json => {
      return json.artists;
    });
};

class Search extends React.Component {
  state = {
    searchVal: '',
    focus: false,
    suggestions: [],
    focusedElementIndex: null,
    shiftDown: false
  };

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

  handleInputChange = e => {
    const val = e.target.value;

    if (!val.trim().length) {
      this.setState({
        searchVal: '',
        suggestions: []
      });

      return;
    }

    this.setState({
      searchVal: val
    });

    getSuggestionsWithVal(val)
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

  handleSubmit = e => {
    const { suggestions, focusedElementIndex } = this.state;
    const { history } = this.props;

    e.preventDefault();

    if (focusedElementIndex !== null) {
      const selectedSuggestion = suggestions[focusedElementIndex];
      console.log(selectedSuggestion);
      console.log('submit!');
      history.push(`/search/${selectedSuggestion.name}`, {
        artist: selectedSuggestion
      });
    }
  };

  render() {
    const { focus, searchVal, suggestions, focusedElementIndex } = this.state;

    return (
      <StyledSearchSection>
        <StyleSearchForm
          onSubmit={this.handleSubmit}
          focus={focus === true}
          empty={searchVal.length === 0}
        >
          <StyledInput
            onChange={this.handleInputChange}
            onFocus={() => this.setState({ focus: true })}
            onBlur={() => this.setState({ focus: false })}
            onKeyDown={this.handleKeyDown}
            onKeyUp={this.handleKeyUp}
            value={searchVal}
            placeholder="Search Artists"
            tabIndex={0}
          />

          {searchVal && <StyledTextUnderline>{searchVal}</StyledTextUnderline>}
        </StyleSearchForm>

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
