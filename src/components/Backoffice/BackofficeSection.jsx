import React, { useState } from "react";
import useDishes from "../../hooks/useDishes"; 
import styles from "./backoffice.module.css"; 

const Backoffice = () => {
  const { dishes, createDish, updateDish, deleteDish } = useDishes(); // Get dishes and dish management functions from the custom hook
  const [dishForm, setDishForm] = useState({ title: "", price: 0, discount: 0, image: "" }); // State to manage the form data
  const [isEditing, setIsEditing] = useState(false); // State to track if we are editing a dish
  const [editDishId, setEditDishId] = useState(null); // State to store the ID of the dish being edited

  // Handle create or update depending on the editing state
  const handleCreateOrUpdate = () => {
    if (isEditing) {
      updateDish(editDishId, dishForm); // Update dish if editing
    } else {
      createDish(dishForm); // Create new dish if not editing
    }
    setDishForm({ title: "", price: 0, discount: 0, image: "" }); // Reset the form after creating or updating
    setIsEditing(false); // Set editing state back to false
    setEditDishId(null); // Reset the editing dish ID
  };

  // Pre-fill the form with the dish data for editing
  const handleEdit = (dish) => {
    setDishForm(dish); // Set form to selected dish's details
    setIsEditing(true); // Set editing state to true
    setEditDishId(dish._id); // Set the ID of the dish being edited
  };

  // Handle dish deletion
  const handleDelete = (id) => {
    deleteDish(id); // Call delete function from the custom hook
  };

  return (
    <div className={styles.backoffice}>
      <h1>Dish Management</h1>
      <div className={styles.dishForm}>
        {/* Dish form inputs */}
        <label>
          Title:
          <input 
            type="text" 
            placeholder="Title" 
            value={dishForm.title} 
            onChange={(e) => setDishForm({ ...dishForm, title: e.target.value })} 
          />
        </label>
        <label>
          Price:
          <input 
            type="number" 
            placeholder="Price" 
            value={dishForm.price} 
            onChange={(e) => setDishForm({ ...dishForm, price: parseFloat(e.target.value) })} 
          />
        </label>
        <label>
          Discount:
          <input 
            type="number" 
            placeholder="Discount" 
            value={dishForm.discount} 
            onChange={(e) => setDishForm({ ...dishForm, discount: parseFloat(e.target.value) })} 
          />
        </label>
        <label>
          Image URL:
          <input 
            type="text" 
            placeholder="Image URL" 
            value={dishForm.image} 
            onChange={(e) => setDishForm({ ...dishForm, image: e.target.value })} 
          />
        </label>
        {/* Button changes based on editing state */}
        <button 
          className={isEditing ? styles.update : styles.create} 
          onClick={handleCreateOrUpdate}
        >
          {isEditing ? "Update Dish" : "Create Dish"} {/* Button text changes */}
        </button>
      </div>
      
      {/* List of all dishes */}
      <div className={styles.dishList}>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dishes.map((dish) => (
              <tr key={dish._id}>
                <td>{dish.title}</td>
                <td>{dish.price},-</td>
                <td>{dish.discount}%</td>
                <td>
                  <img src={dish.image} alt={dish.title} width="50" />
                </td>
                <td>
                  {/* Edit and delete buttons for each dish */}
                  <button className={styles.edit} onClick={() => handleEdit(dish)}>Edit</button>
                  <button className={styles.delete} onClick={() => handleDelete(dish._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Backoffice;
