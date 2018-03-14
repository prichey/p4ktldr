import React from 'react';

class Results extends React.Component {
  constructor() {
    super();

    this.state = {
      search: null,
      artist: null
    }
  }

  componentDidMount() {
    if (!this.props.location.state) return;

    this.setState({
      search: {...this.props.location.state.suggestion}
    });
  }
  render() {
    console.log(this.state);

    const {search} = this.state;

    if (!search) return null;

    return <h2>{search.name}</h2>;
  }
}

export default Results;
