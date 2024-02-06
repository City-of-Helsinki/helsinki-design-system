import React from 'react';

import styles from '../Select.module.scss';
import { DivElementProps } from '..';
import classNames from '../../../utils/classNames';
import { PropSetter } from '../../group/utils';
import { getMetaDataFromController } from '../utils';

export const searchAndFilterInfoPropSetter: PropSetter<DivElementProps & { show: boolean }> = ({ controller }) => {
  const data = getMetaDataFromController(controller);
  const show = data.isSearching;
  return {
    show,
    className: classNames(styles.searchAndFilterInfoContainer),
  };
};

export function SearchAndFilterInfo(props: DivElementProps & { show?: boolean }) {
  const { children, show, ...attr } = props;
  if (!show) {
    return null;
  }
  return (
    <div {...attr}>
      <p>Searching...</p>
      {children}
    </div>
  );
}
