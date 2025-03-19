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

  return { dishes, isLoading, fetchError };
};

export default useDishes;
