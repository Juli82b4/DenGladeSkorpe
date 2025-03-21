import React, { useState, useEffect } from "react";
import useOrders from "../../hooks/useOrders";
import styles from "./ordersection.module.css";

const OrderSection = () => {
  const [cart, setCart] = useState([]); // State to store cart items
  const [comment, setComment] = useState(""); // State to store user comments
  const { submitOrder, fetchError } = useOrders(); // Custom hook for order submission

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Calculate the total price of all items in the cart
  const total = cart.reduce(
    (sum, item) => sum + (item.count || 0) * (item.price || 0),
    0
  );

  // Remove an item from the cart by index
  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index); // Filter out the item
    setCart(updatedCart); // Update state
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  };

  // Submit the order with cart, comment, and total
  const handleOrderSubmit = async () => {
    try {
      await submitOrder(cart, comment, total); // Call the submitOrder function
      alert("Order successfully submitted!");
      localStorage.removeItem("cart"); // Clear cart from localStorage
      setCart([]); // Clear cart state
    } catch (error) {
      alert(`Error: ${error.message}`); // Show error message
    }
  };

  return (
    <div className={styles.orderSection}>
      {/* Render each item in the cart */}
      {cart.map((item, index) => (
        <div key={index} className={styles.cartItem}>
          <div className={styles.cartItemHeader}>
            <span>{item.count} X</span>
            <img src={item.image} alt={item.title} className={styles.itemImage} />
            <p>{item.title}</p>
          </div>
          <div className={styles.cartItemDetails}>
            <p>Ekstra: {item.ingredients?.join(", ") || "Ingen"}</p>
            <p>Størrelse: {item.size || "Standard"}</p>
            <p>Pris: {item.count * item.price},-</p>
            <button onClick={() => removeItem(index)} className={styles.deleteButton}>
              X Slet
            </button>
          </div>
        </div>
      ))}

      {/* Display the total price */}
      <div className={styles.totalBox}>
        <h2>
          I alt: {total.toFixed(2)},-
        </h2>
      </div>

      {/* Textarea for user to add a comment */}
      <textarea
        className={styles.commentInput}
        placeholder="Skriv en kommentar til din ordre (valgfrit)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {/* Button to submit the order */}
      <button onClick={handleOrderSubmit} className={styles.checkoutButton}>
        Afgiv ordre
      </button>

      {/* Display any error from the order submission */}
      {fetchError && <div className={styles.error}>{fetchError}</div>}
    </div>
  );
};

export default OrderSection;
