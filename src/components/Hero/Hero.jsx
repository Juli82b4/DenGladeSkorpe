import React from "react";
import styles from "./hero.module.css";
import Navigation from "../Navigation/Navigation";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <Navigation />
      <div className={styles.heroText}>
        <h1>
          DEN
          <br />
          <span>GLADE</span>
          <br />
          SKORPE
        </h1>
      </div>
    </div>
  );
};

export default Hero;
