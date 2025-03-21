import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // For getting the dish id from the URL
import useDishes from "../../hooks/useDishes"; // Custom hook to fetch dish details
import styles from "./DishDetail.module.css"; // CSS styles for the component
import useIngredients from "../../hooks/useIngredients"; // Custom hook for ingredients

const DishDetail = () => {
  // Get the id from the URL
  const { id } = useParams();
  // Destructure the required functions and data from the hooks
  const { getDishById } = useDishes();
  const { ingredients } = useIngredients();

  // State variables for storing dish details, selected size, ingredients, etc.
  const [dish, setDish] = useState(null);
  const [selectedSize, setSelectedSize] = useState("Almindelig");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [showIngredients, setShowIngredients] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the dish by id when the component mounts or the id changes
  useEffect(() => {
    getDishById(id)
      .then(setDish)
      .catch((err) => setError(err.message)); 
  }, [id]);

  // Function to add the dish to the cart
  const addToCart = () => {
    const newItem = {
      _id: dish._id,
      title: dish.title,
      image: dish.image,
      price:
        selectedSize === "Almindelig" ? dish.price.normal : dish.price.family,
      count: 1,
      size: selectedSize,
      ingredients: selectedIngredients,
    };

    // Retrieve the cart from localStorage, or initialize it as an empty array
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    storedCart.push(newItem); // Add the new item to the cart
    localStorage.setItem("cart", JSON.stringify(storedCart)); // Save the updated cart back to localStorage
  };

  // Handle ingredient selection (adding/removing ingredients from the selected list)
  const handleIngredientSelect = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient) // Remove ingredient if already selected
        : [...prev, ingredient] // Add ingredient if not already selected
    );
  };

  // Show error message if there's an error fetching the dish
  if (error) return <div className={styles.error}>Error: {error}</div>;

  // Show loading message until the dish is fetched
  if (!dish) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.dishDetailContainer}>
      {/* Display dish image */}
      <img src={dish.image} alt={dish.title} className={styles.image} />

      <div className={styles.ingredients}>
        {/* Display dish title */}
        <h1 className={styles.title}>{dish.title}</h1>

        {/* Display ingredients list of the dish */}
        {dish.ingredients.map((ingredient, index) => (
          <p key={index}>{ingredient}</p>
        ))}

        {/* Toggle to show or hide ingredient selector */}
        <div className={styles.ingredientSelector}>
          <button
            onClick={() => setShowIngredients(!showIngredients)} // Toggle visibility of ingredients
            className={styles.ingredientToggle}
          >
            {showIngredients ? "Skjul ingredienser" : "Vælg ingredienser"}
          </button>
          {showIngredients && (
            <div className={styles.ingredientBox}>
              {/* List available ingredients for selection */}
              {["Chilli", "Hvidløg", "Rød peber", "Kebab"].map(
                (ingredient, index) => (
                  <p
                    key={index}
                    className={
                      selectedIngredients.includes(ingredient)
                        ? styles.selectedIngredient
                        : styles.ingredientItem
                    }
                    onClick={() => handleIngredientSelect(ingredient)} // Handle ingredient selection
                  >
                    {ingredient}
                  </p>
                )
              )}
            </div>
          )}

          {/* Display selected ingredients */}
          <div className={styles.selectedIngredientsList}>
            {selectedIngredients.length > 0 && <h3>Valgte ingredienser:</h3>}
            {selectedIngredients.map((ingredient, index) => (
              <p key={index} className={styles.selectedIngredientItem}>
                {ingredient}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Size selection for the dish */}
      <div className={styles.sizeSelector}>
        <h2>Vælg størrelse</h2>
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)} // Update selected size
        >
          <option value="Almindelig">Almindelig</option>
          <option value="Family">Family</option>
        </select>
      </div>

      {/* Display the price based on selected size */}
      <p className={styles.price}>
        Pris:{" "}
        {selectedSize === "Almindelig" ? dish.price.normal : dish.price.family}
        ,-
      </p>

      {/* Add the dish to the cart */}
      <button onClick={addToCart} className={styles.addToCartButton}>
        Tilføj {dish.title} til kurven
      </button>
    </div>
  );
};

export default DishDetail;
