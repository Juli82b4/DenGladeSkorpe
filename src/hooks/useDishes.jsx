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

  return { dishes, isLoading, fetchError, getDishById };
};

export default useDishes;
