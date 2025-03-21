import React from "react";
import styles from "./dishes.module.css"; 
import useDishes from "../../hooks/useDishes"; 

const Dishes = () => {
  const { dishes, isLoading, fetchError } = useDishes(); // Use the custom hook to fetch dishes

  if (isLoading) return <p>Loading dishes...</p>; // Show loading message
  if (fetchError) return <p>Error: {fetchError}</p>; // Show error message if fetch fails

  // Group dishes by category and limit to 3 items per category
  const pizzaDishes = dishes
    .filter((dish) => dish.category === "Pizzaer")
    .slice(0, 3); // Get top 3 pizza dishes
  const inbagteDishes = dishes
    .filter((dish) => dish.category === "Indbagte pizzaer")
    .slice(0, 3); // Get top 3 inbagte dishes
  const durumDishes = dishes
    .filter((dish) => dish.category === "Durum ruller")
    .slice(0, 3); // Get top 3 durum dishes

  // Combine the selected dishes from each category
  const displayedDishes = [...pizzaDishes, ...inbagteDishes, ...durumDishes];

  return (
    <div className={styles.container}>
      <div className={styles.dishes}>
        {/* Loop through and display the dishes */}
        {displayedDishes.map((dish) => (
          <div
            key={dish._id}
            className={styles.dishesItem}
            style={{ backgroundImage: `url(${dish.image})` }} // Set background image for the dish
          >
            <div className={styles.titleOverlay}>
              <h2>
                <a className={styles.dishLink} href={`dish/${dish._id}`}> {/* Link to individual dish page */}
                  {dish.title} {/* Display dish title */}
                </a>
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dishes;
