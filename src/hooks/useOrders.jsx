import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const { token } = useContext(AuthContext); // Get the authentication token from context

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
          Authorization: `Bearer ${token}`, // Attach the token for authentication
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
        dish: item._id, // Assuming `id` is the unique identifier for the dish
        amount: item.count,
        size: item.size || "normal", // Default to 'normal' if size is not specified
        extraIngredients: item.ingredients || [], // Ensure we send an empty array if no ingredients
      })),
      comment, // Pass the comment here
      totalPrice: total, // Calculate total price
    };

    try {
      const response = await fetch("http://localhost:3042/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Attach the token for authentication
        },
        body: JSON.stringify(orderData),
      });

      console.log(orderData.dishes); // Log the status code
      const result = await response.json();
      console.log("Response data:", result); // Log the response data

      if (!response.ok) {
        throw new Error(
          `Failed to submit order: ${result.message || "Unknown error"}`
        );
      }

      return result;
    } catch (error) {
      console.error("Error while submitting order:", error); // Log the error details
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
