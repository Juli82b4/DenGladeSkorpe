import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useDishes from "../../hooks/useDishes";
import styles from "./DishDetail.module.css";
import useIngredients from "../../hooks/useIngredients";

const DishDetail = () => {
  const { id } = useParams();
  const { getDishById } = useDishes();
  const { ingredients } = useIngredients();
  const [dish, setDish] = useState(null);
  const [selectedSize, setSelectedSize] = useState("Almindelig");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [showIngredients, setShowIngredients] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDishById(id)
      .then(setDish)
      .catch((err) => setError(err.message));
  }, [id]);

  const addToCart = () => {
    const newItem = {
      _id: dish._id,
      title: dish.title,
      image: dish.image,
      price: selectedSize === "Almindelig" ? dish.price.normal : dish.price.family,
      count: 1,
      size: selectedSize,
      ingredients: selectedIngredients,
    };

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    storedCart.push(newItem);
    localStorage.setItem("cart", JSON.stringify(storedCart));
  };

  const handleIngredientSelect = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!dish) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.dishDetailContainer}>
      <img src={dish.image} alt={dish.title} className={styles.image} />

      <div className={styles.ingredients}>
        <h1 className={styles.title}>{dish.title}</h1>
        {dish.ingredients.map((ingredient, index) => (
          <p key={index}>{ingredient}</p>
        ))}

        <div className={styles.ingredientSelector}>
          <h2 onClick={() => setShowIngredients(!showIngredients)} className={styles.toggleButton}>
            Tilføj ekstra ingredienser
          </h2>
          {showIngredients && (
            <div className={styles.ingredientBox}>
              {ingredients.map((ingredient, index) => (
                <p
                  key={index}
                  className={
                    selectedIngredients.includes(ingredient)
                      ? styles.selectedIngredient
                      : styles.ingredientItem
                  }
                  onClick={() => handleIngredientSelect(ingredient)}
                >
                  {ingredient}
                </p>
              ))}
            </div>
          )}
          <div className={styles.selectedIngredientsList}>
            {selectedIngredients.length > 0 && <h3>Valgte ingredienser:</h3>}
            {selectedIngredients.map((ingredient, index) => (
              <p key={index} className={styles.selectedIngredientItem}>{ingredient}</p>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.sizeSelector}>
        <h2>Vælg størrelse</h2>
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value="Almindelig">Almindelig</option>
          <option value="Family">Family</option>
        </select>
      </div>

      <p className={styles.price}>
        Pris: {selectedSize === "Almindelig" ? dish.price.normal : dish.price.family},-
      </p>

      <button onClick={addToCart} className={styles.addToCartButton}>
        Tilføj {dish.title} til kurven
      </button>
    </div>
  );
};

export default DishDetail;