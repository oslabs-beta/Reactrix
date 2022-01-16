import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useHierarchyData } from '../context/HierarchyContextProvider';
import { IOrgTreeNodeProps } from '../interfaces';
import { RenderNode } from './RenderNode';

export const isLastNode = (data: any, prop: IOrgTreeNodeProps) => {
  const node = prop.node;
  return !(Array.isArray(data[node.children]) && data[node.children].length > 0);
};

export const TreeNode = (props: IOrgTreeNodeProps) => {
  const { hierarchy } = useHierarchyData();
  return (
    <DndProvider backend={HTML5Backend}>
      <RenderNode data={hierarchy} prop={props} first />
    </DndProvider>
  );
};
