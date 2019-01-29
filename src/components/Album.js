import React from 'react';
import styled from 'styled-components';
import LazyLoad from 'react-lazy-load';

const StyledResult = styled.li`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1em;
  font-size: 14px;

  @media (min-width: 550px) {
    font-size: 18px;
  }
`;

const StyledAlbumArtWrap = styled.div`
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

const StyledRatingWrap = styled.div`
  padding-left: 1em;
  // display: flex;
  // flex-direction: column;
  // justify-content: space-around;

  & > * {
    margin-bottom: 0.5em;
  }
`;

const StyledAlbumTitle = styled.span``;
const StyledAlbumYear = styled.span`
  &:before {
    content: ' (';
  }

  &:after {
    content: ')';
  }
`;
const StyledAlbumRating = styled.span`
  display: block;
  color: #ec2227;
`;

const Album = ({ album }) => {
  return (
    <StyledResult>
      <StyledAlbumArtWrap>
        <LazyLoad height={60}>
          <img src={album.photo} alt={album.name} />
        </LazyLoad>
      </StyledAlbumArtWrap>

      <StyledRatingWrap>
        <div>
          <StyledAlbumTitle>{album.name}</StyledAlbumTitle>
          {album.year && <StyledAlbumYear>{album.year}</StyledAlbumYear>}
        </div>

        <div>
          <StyledAlbumRating>{album.rating}</StyledAlbumRating>
        </div>
      </StyledRatingWrap>
    </StyledResult>
  );
};

export default Album;
