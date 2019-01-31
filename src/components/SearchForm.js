import React, { useState } from 'react';
import styled from 'styled-components';
import { unescape } from 'lodash';

import search from './../img/search.svg';
import close from './../img/close.svg';

const StyleSearchForm = styled.form`
  border-bottom: 3px solid
    ${props => (props.focus ? props.theme.dark : props.theme.light)};
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
  width: calc(100% - 30px);
  padding-right: 1em;
  border: none;
  line-height: 1.5em;
  color: ${props => props.theme.dark};
  text-overflow: ellipsis;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.dark};
    width: 100%;
    padding-right: 0;

    &::placeholder {
      visibility: hidden;
    }
  }

  &::placeholder {
    color: ${props => props.theme.light};
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
    background: ${props => props.theme.accent};
    width: 100%;
    visibility: visible;
  }
`;

const StyledCloseButton = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 15%;
  max-width: 30px;

  &:after {
    display: block;
    content: url(${close});
    width: 100%;
    height: 100%;
    margin-top: 5px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const SearchForm = ({
  handleSubmit,
  searchVal,
  handleInputChange,
  handleInputFocus,
  handleInputBlur,
  inputRef,
  resetSearchState
}) => {
  const [focus, setFocus] = useState(false);

  const displayVal = unescape(searchVal);

  const handleFocus = () => {
    setFocus(true);
    handleInputFocus && handleInputFocus();
  };

  const handleBlur = () => {
    setFocus(false);
    handleInputBlur && handleInputBlur();
  };

  return (
    <StyleSearchForm
      onSubmit={handleSubmit}
      focus={focus}
      empty={displayVal.length === 0}
    >
      <StyledInput
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={displayVal}
        placeholder="Search Artists"
        ref={inputRef}
      />

      {searchVal && !focus && <StyledCloseButton onClick={resetSearchState} />}

      {searchVal && <StyledTextUnderline>{displayVal}</StyledTextUnderline>}
    </StyleSearchForm>
  );
};

export default SearchForm;
