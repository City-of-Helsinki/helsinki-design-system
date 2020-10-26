import React from 'react';

/**
 * Merges native element props and given type
 */
export type MergeElementProps<T extends React.ElementType, P extends object = {}> = Omit<
  React.ComponentPropsWithoutRef<T>,
  keyof P
> &
  P;

/**
 * Extends the React FunctionComponent type with the componentName key
 */
export type FCWithName = React.FC & { componentName: string };
