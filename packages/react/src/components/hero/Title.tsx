import React from 'react';

import styles from './Hero.module.scss';
import classNames from '../../utils/classNames';
import { AllElementPropsWithoutRef } from '../../utils/elementTypings';

export type TitleProps = AllElementPropsWithoutRef<'h1'> & {
  /**
   * Heading level
   * @default 1
   */
  headingLevel?: number;
};
export const Title = (props: TitleProps): React.ReactElement => {
  const { headingLevel = 1, className, children, ...elementProps } = props;
  const classList = classNames(styles.title, className);
  // "as 'h1' | 'h2' ..." is the simplest way to solve ts errors with props of an unknown element
  const TagName = `h${headingLevel}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  return (
    <TagName {...elementProps} className={classList}>
      {children}
    </TagName>
  );
};
