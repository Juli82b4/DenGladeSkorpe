import React from "react";
import cart from "../../assets/basket_icon.png";
import styles from "./cart.module.css";

const Cart = () => {
  return (
    <div className={styles.cart}>
      <a href="/"></a>
      <img src={cart} alt="Den Galde Logo" />
    </div>
  );
};

export default Cart;
