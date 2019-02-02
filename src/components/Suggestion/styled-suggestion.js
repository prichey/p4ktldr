import styled from 'styled-components';
import { Link } from '@reach/router';

export const StyledSuggestion = styled.li`
  margin-bottom: 0.5em;
  font-size: 18px;

  @media (min-width: ${props => props.theme.bp.mobile}) {
    font-size: 20px;
  }
`;

export const StyledSuggestionLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.color.dark};

  &:hover {
    color: ${props => props.theme.color.accent};
  }

  &:focus {
    color: ${props => props.theme.color.accent};
    outline: none;
  }
`;
