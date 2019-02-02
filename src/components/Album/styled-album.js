import styled from 'styled-components';

export const StyledResult = styled.li`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1em;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (min-width: ${props => props.theme.bp.mobile}) {
    font-size: 20px;
    margin-bottom: 1.5em;
  }
`;

export const StyledAlbumArtWrap = styled.a`
  width: 40px;
  flex-shrink: 0;
  font-size: 12px;

  @media (min-width: ${props => props.theme.bp.mobile}) {
    width: 60px;
  }

  img {
    width: 100%;
  }
`;

export const StyledAlbumInfoWrap = styled.div`
  padding-left: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const StyledAlbumYear = styled.span`
  &:before {
    content: ' (';
  }

  &:after {
    content: ')';
  }
`;
export const StyledAlbumRating = styled.span`
  color: ${props => (props.bestNew ? props.theme.color.accent : 'inherit')};
`;
