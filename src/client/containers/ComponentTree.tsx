import * as React from 'react';
import { useDrop } from 'react-dnd';
import OrgTreeComponent, { useTree } from '../tree';

import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

let data = {
  id: 1,
  label: 'App',
  children: [],
};

export default function ComponentTree(props: any): any {
  // const [collectedProps, drop] = useDrop(() => ({
  //   accept: 'box',
  //   drop: (item: INestedObject, monitor) => {
  //     console.log(
  //       treeRef.current?.addChildrenById(treeRef.current.data.id, [item])
  //     );
  //   },
  //   collect: (monitor) => ({
  //     isOver: !!monitor.isOver(),
  //   }),
  // }));
  const { treeRef } = useTree();

  // console.log('this is treeRef.current', treeRef.current);

  return (
    <div>
      <div>
        <OrgTreeComponent data={data} ref={treeRef} horizontal />
        {/* <Button
            // onClick={handleClick}
            startIcon={<SaveIcon />}
            variant='outlined'
            className={classes.save}
          >
            Save
          </Button> */}
      </div>
    </div>
  );
}
