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
  constructor() {
    super();

    this.state = {
      searchVal: '',
      focus: false,
      suggestions: []
    };
  }

  componentWillMount() {
    // getSuggestionsWithVal('wil')
    //   .then(suggestions => {
    //     this.setState({
    //       suggestions: suggestions
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  handleInputChange = e => {
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
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(`form submit: ${this.state.searchVal}`);
  };

  render() {
    return (
      <StyledSearchSection>
        <StyleSearchForm
          onSubmit={this.handleSubmit}
          focus={this.state.focus === true}
          empty={this.state.searchVal.length === 0}>
          <StyledInput
            onChange={this.handleInputChange}
            onFocus={() => this.setState({ focus: true })}
            onBlur={() => this.setState({ focus: false })}
            value={this.state.searchVal}
            placeholder="Search Artists"
          />

          {this.state.searchVal && (
            <StyledTextUnderline>{this.state.searchVal}</StyledTextUnderline>
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
