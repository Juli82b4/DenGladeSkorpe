import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext for authentication

const useDishes = () => {
  const [dishes, setDishes] = useState([]); // Store dishes
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [fetchError, setFetchError] = useState(null); // Store errors
  const { token } = useContext(AuthContext); // Get auth token

  // Fetch all dishes on mount
  useEffect(() => {
    const fetchDishesFromServer = async () => {
      try {
        const response = await fetch("http://localhost:3042/dishes");
        if (!response.ok) throw new Error("Failed to fetch dishes");

        const result = await response.json();
        setDishes(result.data);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDishesFromServer();
  }, []); // Run only once

  // Fetch a dish by ID
  const getDishById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3042/dish/${id}`);
      if (!response.ok) throw new Error("Failed to fetch dish");

      const result = await response.json();
      return result.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Create a new FormData object to send form data (including files) to the server

  const addDish = async (newDish) => {
    try {
      const formData = new FormData();
      // Append key-value pairs to the FormData object
      formData.append("title", newDish.title);
      formData.append("category", newDish.category);
      formData.append("price", JSON.stringify(newDish.price));
      formData.append("ingredients", newDish.ingredients.join(","));
      if (newDish.file) formData.append("file", newDish.file);
      // If there is a file (e.g., an image), append it to the FormData object

      const response = await fetch("http://localhost:3042/dish", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to add dish");

      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Update an existing dish
  const updateDish = async (id, updatedDish) => {
    try {
      const formData = new FormData();
      formData.append("title", updatedDish.title);
      formData.append("category", updatedDish.category);
      formData.append("price", JSON.stringify(updatedDish.price));
      formData.append("ingredients", updatedDish.ingredients.join(","));
      formData.append("id", updatedDish.id);
      if (updatedDish.file) formData.append("file", updatedDish.file);

      const response = await fetch(`http://localhost:3042/dish`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to update dish");

      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Delete a dish by ID
  const deleteDish = async (id) => {
    try {
      const response = await fetch(`http://localhost:3042/dish/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to delete dish");

      // Remove deleted dish from state
      setDishes((prevDishes) => prevDishes.filter((dish) => dish._id !== id));
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Return state and functions
  return {
    dishes,
    isLoading,
    fetchError,
    getDishById,
    addDish,
    updateDish,
    deleteDish,
  };
};

export default useDishes;
