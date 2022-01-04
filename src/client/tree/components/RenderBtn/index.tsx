import React, { MouseEvent } from 'react';

import { IRenderCard } from '../interfaces';
import { RenderButton, ContainerButton } from './styles';

export const RenderBtn = ({ setExpand, expand, prop }: IRenderCard) => {
  const { horizontal, renderButton } = prop;

  if (renderButton)
    return (
      <ContainerButton horizontal={!!horizontal}>
        {renderButton({
          isCollapsed: expand,
          onClick: (event: MouseEvent<any, any>) => {
            event.stopPropagation();
            setExpand(!expand);
          },
        })}
      </ContainerButton>
    );

  return (
    <RenderButton
      buttonBorderColor={prop.buttonBorderColor || ''}
      buttonBackgroundColor={prop.buttonBackgroundColor || ''}
      horizontal={!!horizontal}
      expanded={expand}
      onClick={(e) => {
        e.stopPropagation();
        setExpand(!expand);
      }}
    />
  );
};
