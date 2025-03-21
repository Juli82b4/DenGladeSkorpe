import React, { useState } from "react";
import useStaff from "../../../hooks/useStaff";
import styles from "./../backoffice.module.css";

const BackofficeEmployeesPage = () => {
  const { staff, isLoading, fetchError, addStaff, updateStaff, deleteStaff } = useStaff();
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    position: "",
    file: null,
  });

  const [editEmployee, setEditEmployee] = useState({
    id: "",
    name: "",
    position: "",
    file: null,
  });

  const handleNewEmployeeSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newEmployee.name);
      formData.append("position", newEmployee.position);
      if (newEmployee.file) formData.append("image", newEmployee.file);
      
      await addStaff(formData);
      alert("Employee added successfully!");
      setNewEmployee({
        name: "",
        position: "",
        file: null,
      });
    } catch (error) {
      alert("Failed to add employee: " + error.message);
    }
  };

  const handleEditEmployeeSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", editEmployee.name);
      formData.append("position", editEmployee.position);
      if (editEmployee.file) formData.append("image", editEmployee.file);
      
      await updateStaff(editEmployee.id, formData);
      alert("Employee updated successfully!");
      setEditEmployee({
        id: "",
        name: "",
        position: "",
        file: null,
      });
    } catch (error) {
      alert("Failed to update employee: " + error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewEmployee({ ...newEmployee, file: file });
    }
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditEmployee({ ...editEmployee, file: file });
    }
  };

  const handleEditClick = (employee) => {
    setEditEmployee({
      id: employee._id,
      name: employee.name,
      position: employee.position,
      file: employee.image,  // Retain image from existing employee
    });
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteStaff(id);
        alert("Employee deleted successfully!");
      } catch (error) {
        alert("Failed to delete employee: " + error.message);
      }
    }
  };

  return (
    <div className={styles.backofficePage}>
      <h1>Backoffice Employees</h1>
      {isLoading && <p>Loading...</p>}
      {fetchError && <p>Error: {fetchError}</p>}
      <div>
        <h2>Employee List</h2>
        <table className={styles.dishTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>
                  <img src={employee.image} className={styles.dishImage} alt={employee.name} />
                </td>
                <td>{employee.position}</td>
                <td>
                  <div className={styles.actionButtons}>
                    <button
                      className={styles.editButton}
                      onClick={() => handleEditClick(employee._id)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteEmployee(employee._id)}
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
  {/* Form for adding a new employee */}
  <form onSubmit={handleNewEmployeeSubmit} className={styles.form}>
    <h2>Add New Employee</h2>
    <input
      type="text"
      placeholder="Name"
      value={newEmployee.name}  
      onChange={(e) =>
        setNewEmployee({ ...newEmployee, name: e.target.value })
      }
      required
    />
    <input
      type="text"
      placeholder="Position"
      value={newEmployee.position}  
      onChange={(e) =>
        setNewEmployee({ ...newEmployee, position: e.target.value })
      }
      required
    />
    <input
      type="file"
      onChange={handleImageChange}
      accept="image/*"
      required
    />
    <button type="submit">Add Employee</button>
  </form>

  {/* Form for editing an existing employee */}
  {editEmployee.id && (
    <form onSubmit={handleEditEmployeeSubmit} className={styles.form}>
      <h2>Edit Employee</h2>
      <input
        type="text"
        value={editEmployee.name}  
        onChange={(e) =>
          setEditEmployee({ ...editEmployee, name: e.target.value })
        }
        required
      />
      <input
        type="text"
        value={editEmployee.position} 
        onChange={(e) =>
          setEditEmployee({ ...editEmployee, position: e.target.value })
        }
        required
      />
      <input
        type="file"
        onChange={handleEditImageChange}
        accept="image/*"
      />
      <button type="submit">Update Employee</button>
    </form>
  )}
</div>

    </div>
  );
};

export default BackofficeEmployeesPage;
