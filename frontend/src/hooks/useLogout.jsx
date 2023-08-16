import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const logout = () => {
    dispatch({ type: "LOGOUT", payload: { user: null } });
    localStorage.clear();
    navigate("/");
  };
  return logout;
};
