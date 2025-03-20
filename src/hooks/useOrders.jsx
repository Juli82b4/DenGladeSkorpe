import { useState, useEffect } from "react";

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

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

  return { orders, isLoading, fetchError, deleteOrder };
};

export default useOrders;
