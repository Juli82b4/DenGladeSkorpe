import { useState } from "react";
import { Menu, X } from "lucide-react";
import styles from "./navigation.module.css";
import Logo from "../Logo/Logo";
import cartIcon from "../Cart/Cart";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = 2;

  return (
    <nav className={styles.navigation}>
      <div className={styles.navContainer}>
        <img src={Logo} alt="Logo" className={styles.logo} />

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
          <a href="#">Forside</a>
        </li>
        <li>
          <a href="/personalt">Personalt</a>
        </li>
        <li>
          <a href="./Kontakt">Kontakt</a>
        </li>
        <li>                                                                                   
          <a href="./Kurv">Kurv</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
