import React from "react";
import logo from "src/assets/logo.png";
import styles from "logo.module.css";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <a href="/"></a>
      <img src={logo} alt="Den Galde Logo" />
    </div>
  );
};

export default Logo;
