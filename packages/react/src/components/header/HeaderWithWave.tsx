import React from 'react';

import styles from './HeaderWithWave.module.css';

type HeaderWithWaveProps = {
  headingText: string;
};

const HeaderWithWave: React.SFC<HeaderWithWaveProps> = ({ headingText }) => {
  return <div className={styles.headerWithWave}>{headingText}</div>;
};

export default HeaderWithWave;
