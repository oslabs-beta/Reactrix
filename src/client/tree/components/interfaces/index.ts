import { Dispatch, SetStateAction } from 'react';

import { INestedObject, IOrgTreeNodeProps } from '../../../../interfaces';

export interface ITreeOptions {
  horizontal?: boolean;
  strokeColor?: string;
  strokeWidth?: string;
  expanded?: boolean;
}

export interface IRenderChildren {
  list: INestedObject[];
  data: INestedObject;
  prop: IOrgTreeNodeProps;
}

export interface IRender {
  data: INestedObject;
  prop: IOrgTreeNodeProps;
  first?: boolean;
}

export interface IRenderCard {
  data: INestedObject;
  prop: IOrgTreeNodeProps;
  expand?: boolean;
  setExpand: Dispatch<SetStateAction<boolean>>;
}
