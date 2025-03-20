import React, { useState } from "react";
import useDishes from "../../../hooks/useDishes";
import styles from "./../backoffice.module.css";

const BackofficeDishesPage = () => {
  const { dishes, isLoading, fetchError, addDish, updateDish } = useDishes();
  const [newDish, setNewDish] = useState({
    title: "",
    category: "",
    price: { normal: 0, family: 0 },
    ingredients: [],
    image: "",
  });
  const [editDish, setEditDish] = useState({
    id: "",
    title: "",
    category: "",
    price: { normal: 0, family: 0 },
    ingredients: [],
    image: "",
  });

  const handleNewDishSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDish(newDish);
      alert("Dish added successfully!");
    } catch (error) {
      alert("Failed to add dish: " + error.message);
    }
  };

  const handleEditDishSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDish(editDish.id, editDish);
      alert("Dish updated successfully!");
    } catch (error) {
      alert("Failed to update dish: " + error.message);
    }
  };

  return (
    <div className={styles.backofficePage}>
      <h1>Backoffice Dishes</h1>
      {isLoading && <p>Loading...</p>}
      {fetchError && <p>Error: {fetchError}</p>}
      <div>
        <h2>Dish List</h2>
        <table className={styles.dishTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Image</th>
              <th>Ingredients</th>
              <th>Normal Price</th>
              <th>Family Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dishes.map((dish) => (
              <tr key={dish._id}>
                <td>{dish.title}</td>
                <td>
                  <img src={dish.image} className={styles.dishImage} />
                </td>
                <td>{dish.ingredients.join(", ")}</td>
                <td>{dish.price.normal},-</td>
                <td>{dish.price.family},-</td>
                <td>{dish.category}</td>
                <td>
                  <div className={styles.actionButtons}>
                    <button className={styles.editButton}>Edit</button>
                    <button className={styles.deleteButton}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        <form onSubmit={handleNewDishSubmit} className={styles.form}>
          <h2>Add New Dish</h2>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setNewDish({ ...newDish, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Category"
            onChange={(e) =>
              setNewDish({ ...newDish, category: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Normal Price"
            onChange={(e) =>
              setNewDish({
                ...newDish,
                price: { ...newDish.price, normal: +e.target.value },
              })
            }
            required
          />
          <input
            type="number"
            placeholder="Family Price"
            onChange={(e) =>
              setNewDish({
                ...newDish,
                price: { ...newDish.price, family: +e.target.value },
              })
            }
            required
          />
          <input
            type="text"
            placeholder="Ingredients (comma-separated)"
            onChange={(e) =>
              setNewDish({ ...newDish, ingredients: e.target.value.split(",") })
            }
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            onChange={(e) => setNewDish({ ...newDish, image: e.target.value })}
            required
          />
          <button type="submit">Add Dish</button>
        </form>
        <form onSubmit={handleEditDishSubmit} className={styles.form}>
          <h2>Edit Dish</h2>
          <input
            type="text"
            placeholder="Dish ID"
            onChange={(e) => setEditDish({ ...editDish, id: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setEditDish({ ...editDish, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            onChange={(e) =>
              setEditDish({ ...editDish, category: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Normal Price"
            onChange={(e) =>
              setEditDish({
                ...editDish,
                price: { ...editDish.price, normal: +e.target.value },
              })
            }
          />
          <input
            type="number"
            placeholder="Family Price"
            onChange={(e) =>
              setEditDish({
                ...editDish,
                price: { ...editDish.price, family: +e.target.value },
              })
            }
          />
          <input
            type="text"
            placeholder="Ingredients (comma-separated)"
            onChange={(e) =>
              setEditDish({
                ...editDish,
                ingredients: e.target.value.split(","),
              })
            }
          />
          <input
            type="text"
            placeholder="Image URL"
            onChange={(e) =>
              setEditDish({ ...editDish, image: e.target.value })
            }
          />
          <button type="submit">Edit Dish</button>
        </form>
      </div>
    </div>
  );
};

export default BackofficeDishesPage;
