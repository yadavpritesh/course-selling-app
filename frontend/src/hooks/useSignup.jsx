import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navaigate = useNavigate();

  const signup = async (username, password) => {
    setIsLoading(true);
    setError(null);

    const payload = { username, password };
    const response = await fetch("http://localhost:3000/admin/signup", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.message);
    }

    if (response.ok) {
      // Storing in localstorage
      localStorage.setItem("curUser", JSON.stringify(data));

      // Update the context state
      dispatch({ type: "LOGIN", payload: data });

      setIsLoading(false);
      // Navigate
      navaigate("/courses");
    }
  };

  return { signup, isLoading, error };
};
