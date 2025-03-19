import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDishes from "../../hooks/useDishes";
import styles from "./dishdetail.module.css";

const DishDetail = () => {
  const { id } = useParams();
  const { getDishById } = useDishes();
  const [dish, setDish] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const fetchedDish = await getDishById(id);
        setDish(fetchedDish);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDish();
  }, [id]);

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!dish) {
    return <div className={styles.loading}>Loading...</div>;
  }

  console.log(dish);

  return (
    <div className={styles.dishDetail}>
      <h1>{dish.title}</h1>
      <img src={dish.image} alt={dish.title} className={styles.image} />
      <p>Category: {dish.category}</p>
      <p>Ingredients: {dish.ingredients.join(", ")}</p>
      <p>
        Price: Normal - ${dish.price.normal}, Family - ${dish.price.family}
      </p>
    </div>
  );
};

export default DishDetail;
