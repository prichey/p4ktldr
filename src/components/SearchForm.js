import React, { useState } from 'react';
import styled from 'styled-components';

import search from './../img/search.svg';

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
  text-overflow: ellipsis;

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

const SearchForm = ({
  handleSubmit,
  searchVal,
  handleInputChange,
  handleInputFocus,
  handleInputBlur,
  inputRef
}) => {
  const [focus, setFocus] = useState(false);

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
      empty={searchVal.length === 0}
    >
      <StyledInput
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={searchVal}
        placeholder="Search Artists"
        ref={inputRef}
      />

      {searchVal && <StyledTextUnderline>{searchVal}</StyledTextUnderline>}
    </StyleSearchForm>
  );
};

export default SearchForm;
