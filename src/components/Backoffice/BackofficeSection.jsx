import React, { useState } from "react";
import useDishes from "../../hooks/useDishes";
import styles from "./backoffice.module.css";

const Backoffice = () => {
  const { dishes, createDish, updateDish, deleteDish } = useDishes();
  const [dishForm, setDishForm] = useState({ title: "", price: 0, discount: 0, image: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editDishId, setEditDishId] = useState(null);

  const handleCreateOrUpdate = () => {
    if (isEditing) {
      updateDish(editDishId, dishForm);
    } else {
      createDish(dishForm);
    }
    setDishForm({ title: "", price: 0, discount: 0, image: "" });
    setIsEditing(false);
    setEditDishId(null);
  };

  const handleEdit = (dish) => {
    setDishForm(dish);
    setIsEditing(true);
    setEditDishId(dish._id);
  };

  const handleDelete = (id) => {
    deleteDish(id);
  };

  return (
    <div className={styles.backoffice}>
      <h1>Dish Management</h1>
      <div className={styles.dishForm}>
        <label>
          Title:
          <input type="text" placeholder="Title" value={dishForm.title} onChange={(e) => setDishForm({ ...dishForm, title: e.target.value })} />
        </label>
        <label>
          Price:
          <input type="number" placeholder="Price" value={dishForm.price} onChange={(e) => setDishForm({ ...dishForm, price: parseFloat(e.target.value) })} />
        </label>
        <label>
          Discount:
          <input type="number" placeholder="Discount" value={dishForm.discount} onChange={(e) => setDishForm({ ...dishForm, discount: parseFloat(e.target.value) })} />
        </label>
        <label>
          Image URL:
          <input type="text" placeholder="Image URL" value={dishForm.image} onChange={(e) => setDishForm({ ...dishForm, image: e.target.value })} />
        </label>
        <button className={isEditing ? styles.update : styles.create} onClick={handleCreateOrUpdate}>
          {isEditing ? "Update Dish" : "Create Dish"}
        </button>
      </div>
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
