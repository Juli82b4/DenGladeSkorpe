import React, { useState } from "react";
import useDishes from "../../../hooks/useDishes"; // Custom hook to fetch and manage dishes
import styles from "./../backoffice.module.css"; // Import styles

const BackofficeDishesPage = () => {
  // States for new and editing dishes
  const { dishes, isLoading, fetchError, addDish, updateDish, deleteDish } =
    useDishes();
  const [newDish, setNewDish] = useState({
    title: "",
    category: "",
    price: { normal: 0, family: 0 },
    ingredients: [],
    file: null,
  });

  const [editDish, setEditDish] = useState({
    id: "",
    title: "",
    category: "",
    price: { normal: 0, family: 0 },
    ingredients: [],
    file: "",
  });

  // Handle form submission for adding a new dish
  const handleNewDishSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDish(newDish); // Call the addDish function from the custom hook
      alert("Dish added successfully!");
      setNewDish({
        title: "",
        category: "",
        price: { normal: 0, family: 0 },
        ingredients: [],
        file: null,
      });
    } catch (error) {
      alert("Failed to add dish: " + error.message); // Error handling
    }
  };

  // Handle form submission for updating an existing dish
  const handleEditDishSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDish(editDish.id, editDish); // Call the updateDish function
      alert("Dish updated successfully!");
      setEditDish({
        id: "",
        title: "",
        category: "",
        price: { normal: 0, family: 0 },
        ingredients: [],
        file: "",
      });
    } catch (error) {
      alert("Failed to update dish: " + error.message); // Error handling
    }
  };

  // Handle image file change for new dish
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewDish({ ...newDish, file: file });
    }
  };

  // Handle image file change for editing dish
  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditDish({ ...editDish, file: file });
    }
  };

  // Fill the edit form when clicking edit button
  const handleEditClick = (dish) => {
    setEditDish({
      id: dish._id,
      title: dish.title,
      category: dish.category,
      price: dish.price,
      ingredients: dish.ingredients,
      file: dish.image,
    });
  };

  // Handle deleting a dish
  const handleDeleteDish = async (id) => {
    if (window.confirm("Are you sure you want to delete this dish?")) {
      try {
        await deleteDish(id); // Call the deleteDish function
        alert("Dish deleted successfully!");
      } catch (error) {
        alert("Failed to delete dish: " + error.message); // Error handling
      }
    }
  };

  return (
    <div className={styles.backofficePage}>
      <h1>Backoffice Dishes</h1>
      {isLoading && <p>Loading...</p>} {/* Display loading status */}
      {fetchError && <p>Error: {fetchError}</p>} {/* Display error message */}

      {/* Dish List Table */}
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
                  {/* Edit and Delete buttons */}
                  <div className={styles.actionButtons}>
                    <button
                      className={styles.editButton}
                      onClick={() => handleEditClick(dish)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteDish(dish._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form for adding a new dish */}
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
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
          <button type="submit">Add Dish</button>
        </form>

        {/* Form for editing an existing dish */}
        {editDish.id && (
          <form onSubmit={handleEditDishSubmit} className={styles.form}>
            <h2>Edit Dish</h2>
            <input
              type="hidden"
              value={editDish.id}
              onChange={(e) => setEditDish({ ...editDish, id: e.target.value })}
              required
            />
            <input
              type="text"
              value={editDish.title}
              onChange={(e) =>
                setEditDish({ ...editDish, title: e.target.value })
              }
              required
            />
            <input
              type="text"
              value={editDish.category}
              onChange={(e) =>
                setEditDish({ ...editDish, category: e.target.value })
              }
              required
            />
            <input
              type="number"
              value={editDish.price.normal}
              onChange={(e) =>
                setEditDish({
                  ...editDish,
                  price: { ...editDish.price, normal: +e.target.value },
                })
              }
              required
            />
            <input
              type="number"
              value={editDish.price.family}
              onChange={(e) =>
                setEditDish({
                  ...editDish,
                  price: { ...editDish.price, family: +e.target.value },
                })
              }
              required
            />
            <input
              type="text"
              value={editDish.ingredients.join(", ")}
              onChange={(e) =>
                setEditDish({
                  ...editDish,
                  ingredients: e.target.value.split(","),
                })
              }
              required
            />
            <input
              type="file"
              onChange={handleEditImageChange}
              accept="image/*"
            />
            <button type="submit">Update Dish</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BackofficeDishesPage;
