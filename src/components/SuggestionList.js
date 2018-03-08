import React from 'react';
import styled from 'styled-components';

import Suggestion from './Suggestion';

const StyledSuggestionList = styled.ul`
  list-style: none;
  padding: 0;
`;

class SuggestionList extends React.Component {
  render() {
    console.log(this.props.suggestions);

    const suggestions = this.props.suggestions.map(suggestion => (
      <Suggestion suggestion={suggestion} key={suggestion.id} />
    ));

    return <StyledSuggestionList>{suggestions}</StyledSuggestionList>;
  }
}

export default SuggestionList;
