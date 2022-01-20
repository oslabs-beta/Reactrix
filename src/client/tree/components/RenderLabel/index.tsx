import React, { ReactElement, cloneElement } from 'react';

interface ActiveLinkProps {
  children: ReactElement;
  activeClassName: string;
}

export function RenderLabel({
  children,
  activeClassName,
  ...rest
}: ActiveLinkProps) {
  return <div {...rest}>{cloneElement(children)}</div>;
}
