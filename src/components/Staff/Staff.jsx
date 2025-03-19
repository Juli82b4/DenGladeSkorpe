import React from "react";
import styles from "./staff.module.css";
import useStaff from "../../hooks/useStaff";

const Staff = () => {
  const { staff, isLoading, fetchError } = useStaff();
  const displayedStaff = staff.slice(0, 4); 

  if (isLoading) return <p>Loading staff...</p>;
  if (fetchError) return <p>Error: {fetchError}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.staffGrid}>
        {displayedStaff.map((member) => (
          <div key={member._id} className={styles.staffItem}>
            <img src={member.image} alt={member.name} className={styles.image} />
            <div className={styles.info}>
              <h2 className={styles.name}>{member.name}</h2>
              <p className={styles.position}>{member.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Staff;
