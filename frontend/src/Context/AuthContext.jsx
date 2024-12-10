import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));

  const navigate = useNavigate()

  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem("token", token);
  };

  const isLogedIn = () => {
    if(!authToken){
      navigate('/signin')
    }
  }

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("token");
  };

  const getCurrentUser = () => {

    console.log(authToken);

    const {_id, name, email, accessToken, role, service} = jwtDecode(authToken);

    return { _id, name, email, accessToken, role, service };
  }

  return (
    <AuthContext.Provider value={{ authToken, login, logout, getCurrentUser, isLogedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
