import { useState } from "react";
import { Menu, X } from "lucide-react";
import styles from "./navigation.module.css";
import pizzaLogo from "../assets/pizza-logo.png";
import cartIcon from "../assets/cart-icon.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = 2;

  return (
    <nav className={styles.navigation}>
      <div className={styles.navContainer}>
        <img src={pizzaLogo} alt="Logo" className={styles.logo} />

        <div className={styles.rightIcons}>
          <div className={styles.cartContainer}>
            <img src={cartIcon} alt="Cart" className={styles.cartIcon} />
            {cartCount > 0 && (
              <span className={styles.cartCount}>{cartCount}</span>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={styles.burgerButton}
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      <ul className={`${styles.navLinks} ${isOpen ? styles.open : ""}`}>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Menu</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
