import { useLocalStorage } from "@uidotdev/usehooks"; 
import { createContext, useEffect } from "react"; 
import { jwtDecode } from "jwt-decode"; 
import { useNavigate, useLocation } from "react-router-dom"; 

export const AuthContext = createContext(); 

export const AuthContextProvider = ({ children }) => { 
  const [auth, saveAuth] = useLocalStorage("auth", {}); 
  const [user, setUser] = useLocalStorage("user", {}); 
  const location = useLocation(); 
  const navigate = useNavigate(); 

  useEffect(() => { 
    const checkUser = async () => { 
      if (location.pathname.includes("backoffice") && !location.pathname.includes("login")) {
        if (auth.token !== undefined) { 
          try {
            let response = await fetch("http://localhost:3042/auth/token", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${auth.token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token: auth.token }),
            });

            let result = await response.json(); 

            if (result.message === "Token Expired") {
              saveAuth({});
              setUser({});
              return navigate("/login");
            } else {
              setUser(result.data); 
            }
          } catch (error) {
            console.error("Error during token verification:", error);
            return navigate("/login");
          }
        } else {
          return navigate("/login"); 
        }
      }
    };

    checkUser(); 
  }, [location.pathname, auth.token, navigate, saveAuth]);

  const token = auth.token ? auth.token : ""; 

  const signedIn = auth.token !== undefined; 

  const signIn = async (email, password) => { 
    try {
      let response = await fetch("http://localhost:3042/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      let result = await response.json(); 

      const user = jwtDecode(result.data.token); 

      saveAuth({ token: result.data.token }); 

      setUser(user); 

      navigate("/backoffice"); 

      return user; 
    } catch (error) {
      console.error("Error during sign-in:", error);
      throw new Error("Failed to sign in");
    }
  };

  const getUser = () => { 
    return token !== "" ? jwtDecode(token) : {}; 
  };

  const signOut = () => { 
    saveAuth({}); 
    setUser({}); 
  };

  const value = { token, user, getUser, signIn, signOut, signedIn }; 

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>; 
};
