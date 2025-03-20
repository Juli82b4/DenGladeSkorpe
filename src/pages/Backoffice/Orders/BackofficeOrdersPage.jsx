import React, { useState, useEffect } from "react";
import useOrders from "../../../hooks/useOrders"; 
import styles from "./../backoffice.module.css";

const BackofficeOrdersPage = () => {
  const { orders, isLoading, fetchError, updateOrderStatus, deleteOrder } = useOrders();

  // Handle order status update
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      alert("Order status updated successfully!");
    } catch (error) {
      alert("Failed to update order status: " + error.message);
    }
  };

  // Handle marking order as received
  const handleReceivedOrder = async (orderId) => {
    await handleStatusChange(orderId, "received");
  };

  // Handle deleting an order
  const handleDeleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrder(id);  
        alert("Order deleted successfully!");
      } catch (error) {
        alert("Failed to delete order: " + error.message);
      }
    }
  };

  return (
    <div className={styles.backofficePage}>
      <h1>Backoffice Orders</h1>
      {isLoading && <p>Loading...</p>}
      {fetchError && <p>Error: {fetchError}</p>}

      <div>
        <h2>Order List</h2>
        <table className={styles.orderTable}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Dishes</th>
              <th>Comments</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>
                  {order.dishes.map((dish, index) => (
                    <div key={index}>{dish.title} ({dish.count}x)</div>
                  ))}
                </td>
                <td>{order.comment || "No comments"}</td>
                <td>{order.totalPrice},-</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="received">Received</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  <div className={styles.actionButtons}>
                    <button
                      className={styles.receivedButton}
                      onClick={() => handleReceivedOrder(order.id)}
                    >
                      Received
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BackofficeOrdersPage;
