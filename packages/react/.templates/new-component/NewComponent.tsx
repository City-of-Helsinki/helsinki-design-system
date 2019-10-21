import React from 'react';

import styles from './[-replace-name-capital-].module.css';

type Props = React.PropsWithChildren<{}>;

export default ({ children }: Props) => {
  return <div className={styles.[-replace-name-camel-]}>{children}</div>;
};
