import React from "react";

import styles from "./Button.module.css";

const Button = ({ children }) => {
  return <button className={styles.button}>{children} yedh</button>;
};

export default Button;
