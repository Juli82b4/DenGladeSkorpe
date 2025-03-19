import { useState, useEffect } from "react";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchCategoriesFromServer = async () => {
      try {
        const response = await fetch("http://localhost:3042/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const result = await response.json();
        setCategories(result.data);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoriesFromServer();
  }, []);

  return { categories, isLoading, fetchError };
};

export default useCategories;
