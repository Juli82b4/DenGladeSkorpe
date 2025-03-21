import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Auth context for token

const useStaff = () => {
  const [staff, setStaff] = useState([]); // State to store staff members
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const [fetchError, setFetchError] = useState(null); // State to store errors
  const { token } = useContext(AuthContext); // Get the authentication token from context

  // Fetch staff data from the server when the component mounts
  useEffect(() => {
    const fetchStaffFromServer = async () => {
      try {
        const response = await fetch("http://localhost:3042/employees");
  
        if (!response.ok) {
          throw new Error("Failed to fetch staff");
        }
  
        const result = await response.json();
        setStaff(result.data);
      } catch (error) {  
        setFetchError(error.message);  
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchStaffFromServer(); // Execute the fetch
  }, []);
  

  // Add a new staff member
  const addStaff = async (newEmployee) => {
    try {
      const formData = new FormData();
      formData.append("name", newEmployee.name);
      formData.append("position", newEmployee.position);

      // Add image if exists
      if (newEmployee.file) {
        formData.append("image", newEmployee.file);
      }

      const response = await fetch("http://localhost:3042/employee", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Attach token for authentication
        },
        body: formData, // Send the form data as body
      });

      if (!response.ok) {
        throw new Error("Failed to add employee");
      }

      const result = await response.json();
      setStaff((prevStaff) => [...prevStaff, result.data]); // Add new employee to the state
      return result;
    } catch (error) {
      throw new Error(error.message); // Catch and throw errors
    }
  };

  // Update an existing staff member
  const updateStaff = async (id, updatedEmployee) => {
    try {
      const formData = new FormData();
      formData.append("name", updatedEmployee.name);
      formData.append("position", updatedEmployee.position);

      // Add image if updated
      if (updatedEmployee.file) {
        formData.append("image", updatedEmployee.file);
      }

      const response = await fetch(`http://localhost:3042/employee/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Attach token for authentication
        },
        body: formData, // Send updated data
      });

      if (!response.ok) {
        throw new Error("Failed to update employee");
      }

      const result = await response.json();
      setStaff((prevStaff) =>
        prevStaff.map((employee) =>
          employee._id === id ? result.data : employee
        )
      ); // Update the employee in state
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Delete a staff member by ID
  const deleteStaff = async (id) => {
    try {
      const response = await fetch(`http://localhost:3042/employee/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Attach token for authentication
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }

      setStaff((prevStaff) => prevStaff.filter((employee) => employee._id !== id)); // Remove employee from state
    } catch (error) {
      throw new Error(error.message); // Handle any errors
    }
  };

  // Return the necessary data and functions
  return {
    staff,
    isLoading,
    fetchError,
    addStaff,
    updateStaff,
    deleteStaff,
  };
};

export default useStaff;
