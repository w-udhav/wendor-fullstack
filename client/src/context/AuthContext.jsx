import { authReducer, initialState } from "@/store/authReducer";
import React, {
  createContext,
  useReducer,
  useMemo,
  useState,
  useContext,
} from "react";

export const AuthContext = createContext({
  loading: true,
  setLoading: () => {},
  user: null,
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export default function AuthContextProvider({ children }) {
  const initState = {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
  };

  const [state, dispatch] = useReducer(authReducer, initState);
  const [loading, setLoading] = useState(true);

  // Defining actions
  const login = (user, token) => {
    dispatch({ type: "LOGIN", payload: { user, token } }); // Dispatch login action
    localStorage.setItem("token", token); // Store token in local storage
    localStorage.setItem("user", JSON.stringify(user)); // Store user data
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" }); // Dispatch logout action
    localStorage.removeItem("token"); // Clear local storage
    localStorage.removeItem("user");
  };

  const memorizedValue = useMemo(
    () => ({
      loading,
      setLoading,
      user: state?.user,
      token: state?.token,
      isAuthenticated: state?.isAuthenticated,
      login,
      logout,
    }),
    [state, loading]
  );

  return (
    <AuthContext.Provider value={memorizedValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
