import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const { token } = useContext(AuthContext);

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
      const formData = new FormData();

      formData.append("title", newDish.title);
      formData.append("category", newDish.category);

      // Correctly append the stringified price
      const priceString = JSON.stringify(newDish.price);
      formData.append("price", priceString); // Append stringified price

      formData.append("ingredients", newDish.ingredients.join(","));

      // Append the image file properly
      if (newDish.image) {
        formData.append("image", newDish.image); // Ensure this is the actual file
      }

      // Log to check if 'price' is correctly appended
      console.log("FormData Price:", formData.get("price"));

      const response = await fetch("http://localhost:3042/dish", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Attach token for authentication
        },
        body: formData,
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
      const response = await fetch(`http://localhost:3042/dish`, {
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
