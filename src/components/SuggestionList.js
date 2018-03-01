import React from 'react';
import styled from 'styled-components';
import { unescape } from 'lodash';

const StyledSuggestion = styled.li``;
const StyledSuggestionList = styled.ul``;

class SuggestionList extends React.Component {
  render() {
    console.log(this.props.suggestions);

    const suggestions = this.props.suggestions.map(suggestion => (
      <StyledSuggestion key={suggestion.id}>
        {unescape(suggestion.name)}
      </StyledSuggestion>
    ));

    return <StyledSuggestionList>{suggestions}</StyledSuggestionList>;
  }
}

export default SuggestionList;
