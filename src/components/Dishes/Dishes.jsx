import React from "react";
import styles from "./dishes.module.css";
import useDishes from "../../hooks/useDishes";

const Dishes = () => {
  const { dishes, isLoading, fetchError } = useDishes();

  if (isLoading) return <p>Loading dishes...</p>;
  if (fetchError) return <p>Error: {fetchError}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.dishes}>
        <h1>Our Dishes</h1>
        {dishes.map((dish) => {
          return (
            <div
              key={dish._id}
              className={styles.dishesItem}
              style={{ backgroundImage: `url(${dish.image})` }}
            >
              <h2>{dish.title}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dishes;
