import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export const usePortal = (children: ReactNode, domNodeContainerId: string = 'root') => {
  let domNode = document.getElementById(domNodeContainerId);

  if (!domNode) {
    domNode = document.createElement('div');
    domNode.setAttribute('id', domNodeContainerId);
    document.body.appendChild(domNode);
  }

  return createPortal(children, domNode);
};