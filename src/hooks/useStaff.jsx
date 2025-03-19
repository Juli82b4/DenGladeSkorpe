import { useState, useEffect } from "react";

const useStaff = () => {
  const [staff, setStaff] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

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

    fetchStaffFromServer();
  }, []);

  return { staff, isLoading, fetchError };
};

export default useStaff;
