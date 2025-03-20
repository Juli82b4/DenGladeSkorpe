import React, { useState, useEffect } from "react";
import useOrders from "../../hooks/useOrders";
import styles from "./ordersection.module.css";

const OrderSection = () => {
  const [cart, setCart] = useState([]); // State to store the cart items
  const [comment, setComment] = useState(""); // State for the comment input
  const { submitOrder, fetchError } = useOrders(); // Destructure `submitOrder` from the hook

  // Load the cart data from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || []; // Get cart from localStorage or empty array
    setCart(storedCart); // Set the cart state
  }, []);

  // Calculate the total price of all items in the cart
  const total = cart.reduce((acc, item) => acc + item.count * item.price, 0); // Sum of count * price for each item

  // Function to handle the order submission
  const handleOrderSubmit = async () => {
    try {
      // Ensure the comment is passed here when calling submitOrder
      const result = await submitOrder(cart, comment, total);
      alert("Order successfully submitted!");

      // Optionally, clear the cart after submitting the order
      localStorage.removeItem("cart");
      setCart([]);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className={styles.orderSection}>
      {/* Loop through the cart items and display them */}
      {cart.map((item, index) => (
        <div key={index} className={styles.cartItem}>
          <div className={styles.cartItemHeader}>
            <span className={styles.itemQuantity}>{item.count} X</span>
            <img
              src={item.image}
              className={styles.itemImage}
              alt={item.title}
            />
            <p className={styles.title}>{item.title}</p>
          </div>
          <div className={styles.cartItemDetails}>
            <div className={styles.extraIngredients}>
              <p>
                Ekstra{" "}
                {": " +
                  item.ingredients.map((ingredient) => ingredient).join(", ") ||
                  "Ingen"}
              </p>
            </div>
            <div className={styles.size}>
              <p>Størrelse: {item.size || "Standard"}</p>
            </div>
            <div className={styles.totalPrice}>
              <p>Pris: {item.count * item.price},-</p>
            </div>
            <button
              className={styles.deleteButton}
              onClick={() => removeItem(index)}
            >
              X Slet
            </button>
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

      {/* Comment Section */}
      <div className={styles.commentSection}>
        <textarea
          className={styles.commentInput}
          placeholder="Skriv en kommentar til din ordre (valgfrit)"
          value={comment}
          onChange={(e) => setComment(e.target.value)} // Update comment state on input change
        />
      </div>

      {/* Checkout section */}
      <div className={styles.checkoutSection}>
        <button onClick={handleOrderSubmit} className={styles.checkoutButton}>
          Afgiv ordre
        </button>
      </div>

      {/* Display any fetch error */}
      {fetchError && <div className={styles.error}>{fetchError}</div>}
    </div>
  );
};

export default OrderSection;
