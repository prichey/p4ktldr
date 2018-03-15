import React from 'react';
import fetch from 'node-fetch';
import styled from 'styled-components';

const StyledResults = styled.div``;

class Results extends React.Component {
  state = {
    artist: null,
    albums: null
  };

  componentWillMount() {
    console.log('this.props will', this.props);
    if (!this.props.location.state) return null;
    this.setState({ ...this.props.location.state });
  }

  componentDidMount() {
    console.log(this.state);
    if (!this.props.location.state) return;

    fetch(
      `https://pitchfork.com/api/v2/entities/artists/${
        this.props.location.state.artist.id
      }/albumreviews/`
    )
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({
          albums: res.results.list
        });
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    console.log(this.state);

    const { artist, albums } = this.state;

    if (!artist) return null;

    return (
      <StyledResults>
        <h2>{artist.name}</h2>
        <ul>
          {albums && albums.map((album, i) => <li key={i}>{album.title}</li>)}
        </ul>
      </StyledResults>
    );
  }
}

export default Results;
