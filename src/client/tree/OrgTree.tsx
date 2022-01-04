import React, { forwardRef, useCallback, useState } from 'react';

import { TreeNode } from './components';
import { HierarchyContextProvider } from './context/HierarchyContextProvider';
import { INodeTree, IOrgTreeProps } from './interfaces';
import { OrgTree, OrgTreeContainer } from './OrgTree.styles';

const initialState = {
  node: {
    label: 'label',
    expand: 'expand',
    children: 'children',
  },
};

export const OrgTreeComponent = forwardRef<any, IOrgTreeProps>(
  (
    {
      data,
      onClick,
      collapsable = true,
      expandAll = true,
      horizontal = false,
      ...props
    },
    ref
  ) => {
    const [expandAllNodes, setExpandAllNodes] = useState<boolean>(expandAll);
    const node = initialState.node as INodeTree;

    const onExpandNodes = useCallback(() => {
      const labelDoc = document.getElementById(`children_${data.id}`);
      if (labelDoc) setExpandAllNodes((expandAllNodes) => !expandAllNodes);
      else setExpandAllNodes(true);
    }, [data.id]);

    return (
      <HierarchyContextProvider
        treeRef={ref}
        onExpandNodes={onExpandNodes}
        data={data}
      >
        <OrgTreeContainer horizontal={horizontal}>
          <OrgTree horizontal={horizontal}>
            <TreeNode
              horizontal={horizontal}
              node={node}
              collapsable={collapsable}
              expandAll={expandAllNodes}
              onClick={(e, nodeData) => onClick && onClick(e, nodeData)}
              {...props}
            />
          </OrgTree>
        </OrgTreeContainer>
      </HierarchyContextProvider>
    );
  }
);
