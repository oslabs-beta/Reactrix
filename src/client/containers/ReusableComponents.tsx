import React from 'react';
import { ListItem, Typography } from '@material-ui/core';

import SingleReusableComponent from '../components/SingleReusableComponent';

export default function ReusableComponent(props: any) {
  const { reusableComponents } = props;

  return (
    <div>
      {reusableComponents.map((ele: any, key: any) => (
        <ListItem>{ele.label !== 'App' ? <SingleReusableComponent details={ele} key={key} /> : null}</ListItem>
      ))}
    </div>
  );
}
