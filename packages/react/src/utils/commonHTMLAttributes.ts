import { PointerEventHandler } from 'react';

type TypesReactFixes = {
  /**
   * These are added to all since @types/react has problems across versions
   * TODO: This is here just to fix issues with react/types in the TextInput and various component.
   * It should be removed once the issue is fixed.
   * https://github.com/creativetimofficial/material-tailwind/issues/427
   */
  crossOrigin?: string;
  onPointerEnterCapture?: PointerEventHandler<HTMLElement>;
  onPointerLeaveCapture?: PointerEventHandler<HTMLElement>;
};

export type CommonHTMLAttributes = {
  [key: `data-${string}`]: string;
} & TypesReactFixes;
