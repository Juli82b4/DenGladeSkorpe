import { useState } from "react";
import { useAuthContext } from "../../context/useAuthContext";
import styles from "./login.module.css";

const Login = () => {
  const { error, signIn } = useAuthContext();

  const [email, setEmail] = useState("admin@mediacollege.dk");

  const [password, setPassword] = useState("admin");

  const [loginError, setLoginError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signIn(email, password);
    } catch (err) {
      if (err.name === "InvalidTokenError") {
        setLoginError("Bruger ikke fundet, måske forkert kode.");
      } else {
        setLoginError("An unexpected error occurred. Please try again.");
      }
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3>Login for at få adgang</h3>
        {error && <p className={styles.error}>{error}</p>}
        {loginError && <p className={styles.error}>{loginError}</p>}{" "}
        {/* Display login error */}
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          defaultValue="admin@mediacollege.dk"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          defaultValue="admin"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className={styles.button} type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
