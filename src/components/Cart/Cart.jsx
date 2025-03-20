import React from "react";
import cart from "../../assets/basket_icon.png";
import styles from "./cart.module.css";

const Cart = ({ cartItems = [] }) => {
  // Ensure cartItems is always an array to avoid the "reduce" error
  const totalItems = cartItems.reduce((acc, item) => acc + item.count, 0);

  return (
    <div className={styles.cart}>
      <a href="/kurv">
        <img src={cart} alt="Cart" />
        {totalItems > 0 && (
          <span className={styles.cartCount}>{totalItems}</span>
        )}
      </a>
    </div>
  );
};

export default Cart;
