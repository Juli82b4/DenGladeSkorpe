import React from "react";
import logo from "../../assets/logo.png";
import styles from "./logo.module.css";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <a href="/">
        <img src={logo} alt="Logo" />
      </a>
    </div>
  );
};

export default Logo;
