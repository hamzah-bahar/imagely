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
  const [token, _setToken] = useState(
    localStorage.getItem("ACCESS_TOKEN") || null
  );

  const setToken = (token) => {
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }

    _setToken(token);
  };

  const isAdmin = () => {
    return false;
    //return user && user.isAdmin;
  };
  const isAuthenticated = () => {
    return !!token;
  };

  return (
    <UserContext
      value={{ user, token, setUser, setToken, isAdmin, isAuthenticated }}
    >
      {children}
    </UserContext>
  );
};
export { UserContext };
//export const useUserContext = () => useContext(UserContext);
