import React from "react";

import styles from "./WallOfText.module.css";

type Props = React.PropsWithChildren<{}>;

export default ({ children }: Props) => {
  return <div className={styles.wallOfText}>{children}</div>;
};
