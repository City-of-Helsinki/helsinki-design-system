import React from 'react';

import styles from './Hero.module.scss';
import classNames from '../../utils/classNames';

export type TitleProps = React.HtmlHTMLAttributes<HTMLHeadingElement> & {
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
