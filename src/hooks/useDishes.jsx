import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useDishes = () => {
  const [dishes, setDishes] = useState([]); // State to store dishes
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const [fetchError, setFetchError] = useState(null); // State to store errors
  const { token } = useContext(AuthContext); // Get the authentication token from context

  // Fetch all dishes on initial render
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
  }, []); // Empty dependency array makes sure this runs only once after mount

  // Fetch a specific dish by its ID
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

  // Add a new dish
  const addDish = async (newDish) => {
    try {
      const formData = new FormData();
      formData.append("title", newDish.title);
      formData.append("category", newDish.category);

      // Correctly handle price, ensuring it’s a stringified value
      const priceString = JSON.stringify(newDish.price);
      formData.append("price", priceString);

      formData.append("ingredients", newDish.ingredients.join(","));

      // If there's an image, append it to the formData
      if (newDish.file) {
        formData.append("file", newDish.file);
      }

      const response = await fetch("http://localhost:3042/dish", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token for authentication
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add dish");
      }

      // Returning the response data
      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Update an existing dish
  const updateDish = async (id, updatedDish) => {
    try {
      const formData = new FormData();

      // Append all other fields to FormData
      formData.append("title", updatedDish.title);
      formData.append("category", updatedDish.category);
      const priceString = JSON.stringify(updatedDish.price);
      formData.append("price", priceString);
      formData.append("ingredients", updatedDish.ingredients.join(","));

      // Add the ID to FormData (optional, if needed for your server)
      formData.append("id", updatedDish.id);

      // Add the file if present
      if (updatedDish.file) {
        formData.append("file", updatedDish.file);
      }

      const response = await fetch(`http://localhost:3042/dish`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Attach token for authentication
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update dish");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Delete a dish by its ID
  const deleteDish = async (id) => {
    try {
      const response = await fetch(`http://localhost:3042/dish/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token for authentication
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete dish");
      }

      // Remove the deleted dish from the state
      setDishes((prevDishes) => prevDishes.filter((dish) => dish._id !== id));
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Return the relevant state and functions to be used by components
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
