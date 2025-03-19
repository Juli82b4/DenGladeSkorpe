import React from "react";
import styles from "./intro.module.css";

const Intro = ({ title, text }) => {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
};

export default Intro;
