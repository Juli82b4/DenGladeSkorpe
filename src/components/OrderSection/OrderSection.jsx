import React, { useState, useEffect } from "react";
import styles from "./ordersection.module.css";

const OrderSection = () => {
  const [cart, setCart] = useState([]); // State to store the cart items

  // Load the cart data from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || []; // Get cart from localStorage or empty array
    setCart(storedCart); // Set the cart state
  }, []);

  // Update the cart state and save it to localStorage
  const updateCart = (updatedCart) => {
    setCart(updatedCart); // Update the state
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
  };

  // Increment the item count in the cart
  const incrementCount = (index) => {
    const updatedCart = [...cart]; // Copy the current cart
    updatedCart[index].count += 1; // Increase the count of the selected item
    updateCart(updatedCart); // Update cart state and localStorage
  };

  // Decrement the item count in the cart, or remove the item if the count is zero
  const decrementCount = (index) => {
    const updatedCart = [...cart]; // Copy the current cart
    updatedCart[index].count -= 1; // Decrease the count of the selected item

    // If the count is below zero, remove the item from the cart
    if (updatedCart[index].count <= 0) {
      updatedCart.splice(index, 1); // Remove item from the cart
    }

    updateCart(updatedCart); // Update cart state and localStorage
  };

  // Calculate the total price of all items in the cart
  const total = cart.reduce((acc, item) => acc + item.count * item.price, 0); // Sum of count * price for each item

  return (
    <div className={styles.orderSection}>
      {/* Loop through the cart items and display them */}
      {cart.map((item, index) => (
        <div key={index} className={styles.cartItem}>
          <div className={styles.cartItemHeader}> {/* First line */}
            <span className={styles.itemQuantity}>{item.count} X</span>
            <img src={item.image} className={styles.itemImage} />
            <p className={styles.title}>{item.title}</p>
          </div>
          <div className={styles.cartItemDetails}> {/* Second line */}
            <div className={styles.extraIngredients}>
              <p>Ekstra: {item.extraIngredients || "Ingen"}</p>
            </div>
            <div className={styles.size}>
              <p>Størrelse: {item.size || "Standard"}</p>
            </div>
            <div className={styles.totalPrice}>
              <p>Pris: {item.count * item.price},-</p>
            </div>
          </div>
        </div>
      ))}

      {/* Display total price */}
      <div className={styles.totalBox}>
        <h2>
          <span>I alt: </span>
          {total.toFixed(2)},-
        </h2>
      </div>

      {/* Checkout section */}
      <div className={styles.checkoutSection}>
        <input
          type="email"
          placeholder="Din email"
          className={styles.emailInput}
        />
        <br />
        <button
          onClick={() => alert("Checkout button clicked!")}
          className={styles.checkoutButton}
        >
          Afgiv ordre
        </button>
      </div>
    </div>
  );
};

export default OrderSection;
