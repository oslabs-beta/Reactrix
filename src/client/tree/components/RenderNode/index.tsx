import React, { useEffect, useState } from 'react';

import { isLastNode } from '..';
import { IRender } from '../interfaces';
import { RenderChildren } from '../RenderChildren';
import { RenderCard } from '../RenderCard';
import { OrgTreeNode } from './styles';

export const RenderNode = ({ data, prop, first }: IRender) => {
  const node = prop.node;
  const cls = ['org-tree-node'];

  const [expand, setExpand] = useState(!(node.expand in data && !data[node.expand]));

  useEffect(() => {
    setExpand(prop.expandAll);
  }, [prop.expandAll]);

  if (isLastNode(data, prop)) {
    cls.push('is-leaf');
  } else if (prop.collapsable && !expand) {
    cls.push('collapsed');
  }

  if (first) cls.push('org-tree-node-first');

  return (
    <OrgTreeNode
      id={`node-tree-${data.id}`}
      horizontal={prop.horizontal}
      className={cls.join(' ')}
      strokeColor={prop.strokeColor}
      strokeWidth={prop.strokeWidth}
      onClick={() => console.log('onClick from OrgTreeNode (data): ', data)}
    >
      <RenderCard setExpand={setExpand} expand={expand} data={data} prop={prop} />
      {(!prop.collapsable || expand) && <RenderChildren data={data} list={data.children} prop={prop} />}
    </OrgTreeNode>
  );
};
