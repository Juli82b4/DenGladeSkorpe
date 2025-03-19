import React from "react";
import styles from "./dishes.module.css";
import useDishes from "../../hooks/useDishes";

const Dishes = () => {
  const { dishes, isLoading, fetchError } = useDishes();

  if (isLoading) return <p>Loading dishes...</p>;
  if (fetchError) return <p>Error: {fetchError}</p>;

  // Group dishes by category
  const pizzaDishes = dishes.filter(dish => dish.category === "Pizzaer").slice(0, 3);
  const inbagteDishes = dishes.filter(dish => dish.category === "Indbagte pizzaer").slice(0, 3);
  const durumDishes = dishes.filter(dish => dish.category === "Durum ruller").slice(0, 3);

  // Combine selected dishes
  const displayedDishes = [...pizzaDishes, ...inbagteDishes, ...durumDishes];

  return (
    <div className={styles.container}>
      <div className={styles.dishes}>
        {displayedDishes.map((dish) => (
          <div
            key={dish._id}
            className={styles.dishesItem}
            style={{ backgroundImage: `url(${dish.image})` }}
          >
            <div className={styles.titleOverlay}>
              <h2>{dish.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dishes;
