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
  const [selectedIngredients, setSelectedIngredients] =
    useState("TilføjIngredients");
  const [error, setError] = useState(null);

  useEffect(() => {
    getDishById(id)
      .then(setDish)
      .catch((err) => setError(err.message));
  }, [id]);

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

        <div className={styles.sizeSelector}>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="">Tilføj Ingredients</option>
            {ingredients.map((ingredient, index) => (
              <option value={index}>{ingredient}</option>
            ))}
          </select>
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
        Pris: <br />{" "}
        {selectedSize === "Almindelig" ? dish.price.normal : dish.price.family}
        ,-
      </p>
      <button className={styles.addToCartButton}>
        Tilføj {dish.title} til kurven
      </button>
    </div>
  );
};

export default DishDetail;
