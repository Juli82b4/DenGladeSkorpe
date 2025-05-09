import React from "react";
import useCategories from "../../hooks/useCategories";
import styles from "./category.module.css";

const Category = () => {
  const { categories, isLoading, fetchError } = useCategories();

  if (isLoading) return <p>Loading categories...</p>;
  if (fetchError) return <p>Error: {fetchError}</p>;

  return (
    <div className={styles.container}>
      <h1>Vælg kategori</h1>
      <div className={styles.categories}>
        {categories.slice(0, 3).map((category) => (
          <div key={category._id}>
            <div
              className={styles.categoryItem}
              style={{ backgroundImage: `url(${category.image})` }}
            >
              <div className={styles.categoriesText}>
                <h2>{category.name}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
