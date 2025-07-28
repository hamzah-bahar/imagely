import { createContext, useState } from "react";

const UserContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

  const setToken = (token) => {
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }

    _setToken(token);
  };

  return (
    <UserContext value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext>
  );
};
export { UserContext };
