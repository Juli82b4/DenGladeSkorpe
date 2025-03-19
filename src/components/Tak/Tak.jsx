import React from "react";
import styles from "./tak.module.css";

const Tak = () => {
  return (
    <div className={styles.takContainer}>
      <div className={styles.tak}>
        <h1>Tak for din besked!</h1>
        <p>Vi vender tilbage hurtigst muligt.</p>
      </div>
    </div>
  );
};

export default Tak;
