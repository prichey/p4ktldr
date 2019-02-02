import React, { useState } from 'react';
import { unescape } from 'lodash';

import {
  StyleSearchForm,
  StyledInput,
  StyledTextUnderline,
  StyledCloseButton
} from './styled-search-form';

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
