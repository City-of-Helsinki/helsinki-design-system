import React from 'react';

import { DivElementProps } from '../../modularOptionList/types';
import { useSearchDataHandlers } from '../hooks/useSearchDataHandlers';

export const SearchContainer = ({ children, ...props }: DivElementProps) => {
  const { getMetaData } = useSearchDataHandlers();
  const { elementIds } = getMetaData();

  return (
    <div {...props} id={elementIds.searchContainer} ref={getMetaData().refs.searchContainer}>
      {children}
    </div>
  );
};
