import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:3000/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        username: `${username}`,
        password: `${password}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.message);
    }
    if (response.ok) {
      // Storing data in localstorage
      localStorage.setItem("curUser", JSON.stringify(data));

      // Updating context
      dispatch({ type: "LOGIN", payload: data });

      // Loding false
      setIsLoading(false);
      navigate("/courses");
    }
  };

  return { login, isLoading, error };
};
