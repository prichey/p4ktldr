import styled from 'styled-components';

import close from './close.svg';
import search from './search.svg';

export const StyleSearchForm = styled.form`
  border-bottom: 3px solid
    ${props => (props.focus ? props.theme.color.dark : props.theme.color.light)};
  transition: border-color 150ms;
  position: relative;
  font-size: 36px;
  font-family: 'Volkhov', serif;
  margin-bottom: 20px;

  &:after {
    display: ${props => (props.focus || !props.empty ? 'none' : 'block')};
    content: url(${search});
    position: absolute;
    right: 0;
    top: 50%;
    width: 15%;
    max-width: 30px;
    transform: translateY(-50%);
  }

  @media (min-width: ${props => props.theme.bp.mobile}) {
    font-size: 72px;

    &:after {
      max-width: 45px;
    }
  }
`;

export const StyledInput = styled.input`
  width: calc(100% - 30px);
  padding: 0 1em 0 0;
  border: none;
  line-height: 1.5em;
  color: ${props => props.theme.color.dark};
  text-overflow: ellipsis;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.color.dark};
    width: 100%;
    padding-right: 0;

    &::placeholder {
      visibility: hidden;
    }
  }

  &::placeholder {
    color: ${props => props.theme.color.light};
  }
`;

export const StyledTextUnderline = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  max-width: 100%;
  visibility: hidden;
  height: 0;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 3px;
    background: ${props => props.theme.color.accent};
    width: 100%;
    visibility: visible;
  }
`;

export const StyledCloseButton = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 15%;
  max-width: 20px;

  @media (min-width: ${props => props.theme.bp.mobile}) {
    max-width: 30px;
  }

  &:after {
    display: block;
    content: url(${close});
    width: 100%;
    height: 100%;
    margin-top: 5px;
  }

  &:hover {
    cursor: pointer;
  }
`;
