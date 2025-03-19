import { useState, useEffect } from "react";

const useIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch("http://localhost:3042/ingredients");
        if (!response.ok) {
          throw new Error("Failed to fetch ingredients");
        }
        const result = await response.json();
        setIngredients(result.data.map(item => item.name)); 
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  return { ingredients, isLoading, fetchError };
};

export default useIngredients;