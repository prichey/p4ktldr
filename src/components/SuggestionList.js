import React from 'react';
import styled from 'styled-components';

import Suggestion from './Suggestion';

const StyledSuggestionList = styled.ul`
  list-style: none;
  padding: 0;
`;

class SuggestionList extends React.Component {
  render() {
    const { suggestions, focusedElementIndex } = this.props;

    const suggestionListItems = suggestions.map((suggestion, i) => (
      <Suggestion
        suggestion={suggestion}
        key={suggestion.id}
        index={i}
        focused={i === focusedElementIndex}
      />
    ));

    return <StyledSuggestionList>{suggestionListItems}</StyledSuggestionList>;
  }
}

export default SuggestionList;
