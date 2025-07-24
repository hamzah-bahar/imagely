import { createContext, useState } from "react";

const UserContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
  isAdmin: () => {},
  isAuthenticated: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [_isAdmin, _setIsAdmin] = useState(localStorage.getItem("IS_ADMIN"));

  const setToken = (token) => {
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }

    _setToken(token);
  };

  const setIsAdmin = (admin) => {
    if (admin) {
      localStorage.setItem("IS_ADMIN", true);
    } else {
      localStorage.removeItem("IS_ADMIN");
    }
    _setIsAdmin(admin);
  };
  const isAdmin = () => {
    return !!_isAdmin;
  };
  const isAuthenticated = () => {
    return !!token;
  };

  return (
    <UserContext
      value={{ user, setUser, setToken, isAdmin, isAuthenticated, setIsAdmin }}
    >
      {children}
    </UserContext>
  );
};
export { UserContext };
