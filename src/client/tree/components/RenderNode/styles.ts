import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ITreeOptions } from '../interfaces';

export const OrgTreeNode = styled.div<ITreeOptions>`
  position: relative;
  margin: 0;
  padding: 0;
  list-style-type: none;
  padding-left: 20px;

  &:before,
  &:after {
    transition: all 0.35s;
  }

  padding-top: 20px;
  display: table-cell;
  vertical-align: top;

  &.is-leaf,
  &.collapsed {
    padding-left: 10px;
    padding-right: 10px;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 19px;
  }

  &:after {
    left: 50%;
    border-left: 1px solid
      ${(prop) => (prop.strokeColor ? prop.strokeColor : '#000')};
  }

  &:not(:first-of-type):before,
  &:not(:last-of-type):after {
    border-top: 1px solid
      ${(prop) => (prop.strokeColor ? prop.strokeColor : '#000')};
  }

  // remove the line of the first label
  &.org-tree-node-first {
    padding-top: 0;

    &:before,
    &:after {
      border-left: none;
      opacity: 0;
    }
  }

  ${(props) =>
    props.horizontal &&
    css`
      display: table-cell;
      float: none;
      padding-top: 0;
      padding-left: 20px;

      &.is-leaf,
      &.collapsed {
        padding-top: 10px;
        padding-bottom: 10px;
      }

      &:before,
      &:after {
        width: 19px;
        height: 50%;
      }

      &:after {
        top: 50%;
        left: 0;
        border-left: 0;
      }

      &:only-child:before {
        top: 1px;
        border-bottom: 1px solid
          ${props.strokeColor ? props.strokeColor : '#000'};
      }

      &:not(:first-of-type):before,
      &:not(:last-of-type):after {
        border-top: 0;
        border-left: 1px solid ${props.strokeColor ? props.strokeColor : '#000'};
      }

      &:not(:only-child):after {
        border-top: 1px solid ${props.strokeColor ? props.strokeColor : '#000'};
      }

      // remove the line of the first label
      &.org-tree-node-first {
        padding-left: 0;

        &:after {
          border-left: none;
          opacity: 0;
        }
      }
    `}

  .RdtCant-drop {
    opacity: 0.5;
    cursor: no-drop;
    .org-tree-node-label-inner {
      background-color: #aaaaaa33;
    }
    .org-tree-node-label-inner-personal {
      opacity: 0.5;
    }
  }
`;
