import React from 'react';
import styled from 'styled-components';
import fetch from 'node-fetch';
import Promise from 'bluebird';

import SuggestionList from './SuggestionList';

import search from './../img/search.svg';

const StyledSearchSection = styled.section``;

const StyleSearchForm = styled.form`
  border-bottom: 3px solid ${props => (props.focus ? '#474748' : '#d1d3d4')};
  transition: border-color 150ms;
  margin: 1em 0;
  position: relative;
  font-size: 72px;
  font-family: 'Volkhov', serif;

  &:after {
    display: ${props => (props.focus || !props.empty ? 'none' : 'block')};
    content: url(${search});
    position: absolute;
    right: 0;
    top: 50%;
    width: 15%;
    max-width: 45px;
    transform: translateY(-50%);
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

const StyledInputText = styled.span`
  position: absolute;
  left: 0;
  bottom: -3px;
  height: 3px;
  background-color: #ec2227;
  color: transparent;
  max-width: 100%;
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
  constructor() {
    super();

    this.state = {
      searchVal: '',
      focus: false,
      suggestions: []
    };
  }

  handleInputChange(e) {
    const val = e.target.value;

    this.setState({
      searchVal: val
    });

    getSuggestionsWithVal(val)
      .then(suggestions => {
        this.setState({
          suggestions: suggestions
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(`form submit: ${this.state.searchVal}`);
  }

  render() {
    return (
      <StyledSearchSection>
        <StyleSearchForm
          onSubmit={e => this.handleSubmit(e)}
          focus={this.state.focus === true}
          empty={this.state.searchVal.length === 0}>
          <StyledInput
            onChange={e => this.handleInputChange(e)}
            onFocus={() => this.setState({ focus: true })}
            onBlur={() => this.setState({ focus: false })}
            value={this.state.searchVal}
            placeholder="Search Artists"
          />

          {this.state.searchVal && (
            <StyledInputText>{this.state.searchVal}</StyledInputText>
          )}
        </StyleSearchForm>

        {this.state.suggestions.length > 0 && (
          <SuggestionList suggestions={this.state.suggestions} />
        )}
      </StyledSearchSection>
    );
  }
}

export default Search;
