import React from 'react';

import styles from './HeaderWithWave.module.css';

type HeaderWithWaveProps = {
  headingText: string;
};

const HeaderWithWave: React.SFC<HeaderWithWaveProps> = ({ headingText }) => {
  return <div className={styles.header}>{headingText}</div>;
};

export default HeaderWithWave;
