import { useState, useEffect } from "react";

const useDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchDishesFromServer = async () => {
      try {
        const response = await fetch("http://localhost:3042/dishes");
        if (!response.ok) {
          throw new Error("Failed to fetch dishes");
        }

        const result = await response.json();
        setDishes(result.data);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDishesFromServer();
  }, []);

  const getDishById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3042/dish/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch dish");
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const addDish = async (newDish) => {
    try {
      const response = await fetch("http://localhost:3042/dishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDish),
      });
      if (!response.ok) {
        throw new Error("Failed to add dish");
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateDish = async (id, updatedDish) => {
    try {
      const response = await fetch(`http://localhost:3042/dish/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedDish),
      });
      if (!response.ok) {
        throw new Error("Failed to update dish");
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return { dishes, isLoading, fetchError, getDishById, addDish, updateDish };
};

export default useDishes;
