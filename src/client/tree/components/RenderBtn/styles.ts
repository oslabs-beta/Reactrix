import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ITreeOptions } from '../interfaces';
type IButton = ITreeOptions & {
  buttonBackgroundColor: string;
  buttonBorderColor: string;
};
export const RenderButton = styled.span<IButton>`
  position: absolute;
  display: inline-block;
  top: 100%;
  left: 50%;
  width: 20px;
  height: 20px;
  z-index: 10;
  margin-left: -11px;
  margin-top: 9px;
  background-color: ${(prop) =>
    prop.buttonBackgroundColor ? prop.buttonBackgroundColor : '#fff'};
  border: 1px solid
    ${(prop) => (prop.buttonBorderColor ? prop.buttonBorderColor : '#ccc')};
  border-radius: 50%;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.35s ease;

  :hover {
    filter: brightness(0.9);
    transform: scale(1.1);
  }

  :before,
  :after {
    content: '';
    position: absolute;
  }

  :before {
    top: 50%;
    left: 4px;
    right: 4px;
    height: 0;
    border-top: 1px solid
      ${(prop) => (prop.buttonBorderColor ? prop.buttonBorderColor : '#ccc')};
  }

  :after {
    top: 4px;
    left: 50%;
    bottom: 4px;
    width: 0;
    border-left: 1px solid
      ${(prop) => (prop.buttonBorderColor ? prop.buttonBorderColor : '#ccc')};
  }

  ${(props) =>
    props.expanded &&
    css`
      &:after {
        border: none;
      }
    `}

  ${(props) =>
    props.horizontal &&
    css`
      top: 50%;
      left: 100%;
      margin-top: -11px;
      margin-left: 9px;
    `}
`;

export const ContainerButton = styled.div<ITreeOptions>`
  position: absolute;
  display: inline-block;
  top: 100%;
  left: 50%;
  width: 20px;
  height: 20px;
  z-index: 10;
  margin-left: -11px;
  margin-top: 9px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.35s ease;

  ${(props) =>
    props.horizontal &&
    css`
      top: 50%;
      left: 100%;
      margin-top: -11px;
      margin-left: 9px;
    `}
`;
