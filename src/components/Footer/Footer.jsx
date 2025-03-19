import React from "react";
import styles from "./footer.module.css";
import Logo from "../Logo/Logo"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Logo />
      <div className={styles.info}>
        <p>Email: gladeskropepizza.dk</p>
        <p>Tlf: 12345678</p>
        <p>Address: Skropeej 42, 1234 Pizzagen</p>
      </div>
    </footer>
  );
};

export default Footer;
