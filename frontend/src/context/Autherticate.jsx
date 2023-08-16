import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (prevState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      return prevState;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const curUser = JSON.parse(localStorage.getItem("curUser"));
    if (curUser) {
      dispatch({ type: "LOGIN", payload: { ...curUser } });
    }
  }, []);

  console.log("Auth state: ", state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes;
