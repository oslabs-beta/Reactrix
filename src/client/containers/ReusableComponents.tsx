import React from 'react';
import { ListItem } from '@material-ui/core';

import SingleReusableComponent from '../components/SingleReusableComponent';

export default function ReusableComponent(props: any) {
  const { reusableComponents } = props;

  return (
    <div>
      {reusableComponents.slice(1).map((ele: any, index: any) => {
        return <ListItem>{ele.label !== 'App' && <SingleReusableComponent details={ele} key={index}  />}</ListItem>;
      })}
    </div>
  );
}
