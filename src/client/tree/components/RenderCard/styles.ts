import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ITreeOptions } from '../interfaces';

export const CardArea = styled.div<ITreeOptions>`
  position: relative;
  display: inline-block;
  cursor: move;
  z-index: 10;
  ${(props) =>
    props.horizontal &&
    css`
      display: table-cell;
      vertical-align: middle;
    `}
`;

interface ICardCard {
  isDragging: boolean;
}
export const RenderLabel = styled.div<ICardCard>`
  background-color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  min-width: 100px;
  min-height: 45px;
  z-index: 100000;
  text-align: center;
  color: black;
  position: relative;
  // box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  border: 1px solid lightgrey;
  &:hover {
    background-color: #eeeeee;
  }
  transition: 0.3s;

  // no break line
  white-space: nowrap;
  text-overflow: ellipsis;

  &.mock_card {
    border: 1px solid #7de874;
  }

  ${(props) =>
    props.isDragging &&
    css`
      cursor: grabbing;
    `}
`;

export const RenderCarPersonal = styled.div`
  position: relative;

  &.mock_card {
    border: 1px solid #7de874;
  }
`;

export const StyledLabel = styled.div`
  margin: 0;
  padding: 0;
`;
