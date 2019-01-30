import React from 'react';
import styled from 'styled-components';

const StyledResult = styled.li`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1em;
  font-size: 14px;

  @media (min-width: 550px) {
    font-size: 18px;
    margin-bottom: 1.5em;
  }
`;

const StyledAlbumArtWrap = styled.a`
  width: 40px;
  flex-shrink: 0;
  font-size: 12px;

  @media (min-width: 550px) {
    width: 60px;
  }

  img {
    width: 100%;
  }
`;

const StyledAlbumInfoWrap = styled.div`
  padding-left: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  /* & > * {
    margin-bottom: 0.5em;
  } */
`;

const StyledRatingWrap = styled.div``;

const StyledAlbumTitle = styled.a``;
const StyledAlbumYear = styled.span`
  &:before {
    content: ' (';
  }

  &:after {
    content: ')';
  }
`;
const StyledAlbumRating = styled.span`
  /* display: block; */
  color: #ec2227;
`;

const Album = ({ album }) => {
  return (
    <StyledResult>
      <StyledAlbumArtWrap href={album.url} target="_blank">
        <img src={album.photo} alt={album.name} />
      </StyledAlbumArtWrap>

      <StyledAlbumInfoWrap>
        <div>
          <StyledAlbumTitle href={album.url} target="_blank">
            {album.name}
          </StyledAlbumTitle>
          {album.year && <StyledAlbumYear>{album.year}</StyledAlbumYear>}
        </div>

        <StyledRatingWrap>
          <StyledAlbumRating>{album.rating}</StyledAlbumRating>
        </StyledRatingWrap>
      </StyledAlbumInfoWrap>
    </StyledResult>
  );
};

export default Album;
