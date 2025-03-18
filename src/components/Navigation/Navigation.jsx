import React, { useState, useEffect } from "react";
import styles from "./navigation.module.css";
import Logo from "../Logo/Logo";
import { FaShoppingBag } from "react-icons/fa";

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
        <div
          className={styles.burgerMenu}
          onClick={toggleMenu}
          aria-expanded={isOpen}
        >
          <div className={`${styles.bar} ${isOpen ? styles.open : ""}`}></div>
          <div className={`${styles.bar} ${isOpen ? styles.open : ""}`}></div>
          <div className={`${styles.bar} ${isOpen ? styles.open : ""}`}></div>
        </div>
        <div className={styles.cartContainer}>
          <a href="/checkout">
            <FaShoppingBag className={styles.cartIcon} />
            {cartCount > 0 && (
              <span className={styles.cartCount}>{cartCount}</span>
            )}
          </a>
        </div>
      </div>

      <ul className={`${styles.navLinks} ${isOpen ? styles.open : ""}`}>
        <li>
          <a href="/shop">Shop</a>
        </li>
        <li>
          <a href="/services">Services</a>
        </li>
        <li>
          <a href="/about">Om</a>
        </li>
        <li>
          <a href="/contact">Kontakt</a>
        </li>
        <li>
          <a href="/checkout">Checkout</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
