import React from 'react';

import {
  StyledResult,
  StyledAlbumArtWrap,
  StyledAlbumInfoWrap,
  StyledAlbumYear,
  StyledAlbumRating
} from './styled-album';

const Album = ({ album }) => {
  return (
    <StyledResult>
      <StyledAlbumArtWrap href={album.url} target="_blank">
        <img src={album.photo} alt={album.name} />
      </StyledAlbumArtWrap>

      <StyledAlbumInfoWrap>
        <div>
          <a href={album.url} target="_blank">
            {album.name}
          </a>
          {album.year && <StyledAlbumYear>{album.year}</StyledAlbumYear>}
        </div>

        <div>
          <StyledAlbumRating bestNew={album.bestNew}>
            {album.rating}
          </StyledAlbumRating>
        </div>
      </StyledAlbumInfoWrap>
    </StyledResult>
  );
};

export default Album;
