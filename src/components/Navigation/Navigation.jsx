import React, { useState, useEffect } from "react";
import styles from "./navigation.module.css";
import Logo from "../Logo/Logo";
import Cart from "../Cart/Cart";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalCount = storedCart.reduce((acc, item) => acc + item.count, 0);
    setCartCount(totalCount);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navigation}>
      <Logo />

      <div className={styles.menuIcons}>
        <div className={styles.cartContainer}>
          <Cart />
        </div>

        <div
          className={styles.burgerMenu}
          onClick={toggleMenu}
          aria-expanded={isOpen}
        >
          <div className={`${styles.bar} ${isOpen ? styles.open : ""}`}></div>
          <div className={`${styles.bar} ${isOpen ? styles.open : ""}`}></div>
          <div className={`${styles.bar} ${isOpen ? styles.open : ""}`}></div>
        </div>
      </div>

      <ul className={`${styles.navLinks} ${isOpen ? styles.open : ""}`}>
        <li>
          <a href="/forside">Forside</a>
        </li>
        <li>
          <a href="/personalt">Personalet</a>
        </li>
        <li>
          <a href="/kontakt">Kontakt</a>
        </li>

        <li>
          <a href="/kurv">Kurv</a>
        </li>
        <li>
          <a href="/login">login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
