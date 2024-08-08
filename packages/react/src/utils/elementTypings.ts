import React, { ElementType } from 'react';

import { CommonHTMLAttributes } from './commonHTMLAttributes';

// Good explanation about types: https://mortenbarklund.com/blog/react-typescript-props-spread/
export type AllElementPropsWithoutRef<E extends ElementType> = React.ComponentPropsWithoutRef<E> & CommonHTMLAttributes;
// Use "AllElementPropsWithRef" instead of "JSX.IntrinsicElements"
// Note: JSX.IntrinsicElements always passes a ref as a prop which has the LegacyRef type rather than Ref
export type AllElementPropsWithRef<E extends ElementType> = React.ComponentProps<E> & CommonHTMLAttributes;
/** 
 * example:
  type Base = { a: undefined; b: boolean; c: string };
  type Overrides = { a: string; b: string; d: string; e: number };
  type Result = MergeAndOverrideProps<Base, Overrides>;
  const test: Result = { a: 'a', b: 'f', c: 'c', d: 'd', e: 1 };
 */
export type MergeAndOverrideProps<E, C> = Omit<E, keyof C> & C;
