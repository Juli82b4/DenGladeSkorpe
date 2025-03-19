import React, { useState } from "react";
import styles from "./form.module.css";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    emne: "",
    beskrivelse: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true during submission
    console.log("Form submitted:", formData);

    // Simulate a network request or some action before redirect
    setTimeout(() => {
      // Redirect to "Tak" page after submission
      window.location.href = "/tak";
    }, 1000); // Delay to simulate processing
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Navn</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />                                           
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="emne">Emne</label>
        <input
          type="text"
          id="emne"
          name="emne"
          value={formData.emne}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="beskrivelse">Beskrivelse</label>
        <textarea
          id="beskrivelse"
          name="beskrivelse"
          value={formData.beskrivelse}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className={styles.submitButton} disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </button>
    </form>
  );
};

export default Form;
