import React from 'react';

import styles from './sidebar.module.scss';

export interface SidebarProps {
  className?: string;
  actions?: React.ReactNodeArray;
  children: React.ReactNodeArray;
}

const Sidebar: React.SFC<SidebarProps> = ({ actions = [], children }) => {
  const mainElements = children.map(child => <div className={styles.elementWrapper}>{child}</div>);
  const actionsElements = actions.map(action => <div className={styles.elementWrapper}>{action}</div>);

  return (
    <div className={styles.sidebar}>
      <div className={styles.mainWrapper}>{mainElements}</div>
      {!!actions.length && <div className={styles.actionsWrapper}>{actionsElements}</div>}
    </div>
  );
};

export default Sidebar;
