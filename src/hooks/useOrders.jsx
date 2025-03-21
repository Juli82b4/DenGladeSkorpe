import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const { token } = useContext(AuthContext); 
  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3042/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const result = await response.json();
        setOrders(result.data);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Delete an order by ID
  const deleteOrder = async (id) => {
    try {
      const response = await fetch(`http://localhost:3042/orders/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete order");
      }
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    } catch (error) {
      setFetchError(error.message);
    }
  };

  // Update order status
  const updateOrderStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3042/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error("Failed to update order status");
      }
      // Update the status locally
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      setFetchError(error.message);
    }
  };

  // Submit a new order
  const submitOrder = async (cart, comment, total) => {
    const orderData = {
      dishes: cart.map((item) => ({
        dish: item._id, 
        amount: item.count,
        size: item.size || "normal",
        extraIngredients: item.ingredients || [], 
      })),
      comment, 
      totalPrice: total, 
    };

    try {
      const response = await fetch("http://localhost:3042/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      console.log(orderData.dishes); 
      const result = await response.json();
      console.log("Response data:", result); 

      if (!response.ok) {
        throw new Error(
          `Failed to submit order: ${result.message || "Unknown error"}`
        );
      }

      return result;
    } catch (error) {
      console.error("Error while submitting order:", error);
      throw new Error(error.message);
    }
  };

  return {
    orders,
    isLoading,
    fetchError,
    deleteOrder,
    submitOrder,
    updateOrderStatus,
  };
};

export default useOrders;
