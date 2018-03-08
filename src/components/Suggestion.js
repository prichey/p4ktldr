import React from 'react';
import styled from 'styled-components';
import { unescape } from 'lodash';

const StyledSuggestion = styled.li`
  margin-bottom: 0.5em;
  font-size: 18px;

  cursor: ${props => (props.hover ? 'pointer' : 'inherit')};
  color: ${props => (props.hover ? 'red' : 'inherit')};
`;

class Suggestion extends React.Component {
  constructor() {
    super();

    this.state = {
      hover: false
    };
  }

  handleMouseEnter(e) {
    this.setState({
      hover: true
    });
  }

  handleMouseLeave() {
    this.setState({
      hover: false
    });
  }

  render() {
    return (
      <StyledSuggestion
        onMouseEnter={e => this.handleMouseEnter(e)}
        onMouseLeave={e => this.handleMouseLeave(e)}
        hover={this.state.hover === true}>
        {unescape(this.props.suggestion.name)}
      </StyledSuggestion>
    );
  }
}

export default Suggestion;
