import React from 'react';

/**
 * Merges native element props and given type
 */
export type MergeElementProps<T extends React.ElementType, P extends object = {}> = Omit<
  React.ComponentPropsWithoutRef<T>,
  keyof P
> &
  P;
