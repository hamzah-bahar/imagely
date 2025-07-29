import { createContext, useState } from "react";

const NotificationContext = createContext({
  notification: null,
  setNotification: () => {},
});

export const NotificationProvider = ({ children }) => {
  const [notification, _setNotification] = useState(null);

  const setNotification = (message) => {
    _setNotification(message);
    setTimeout(() => {
      _setNotification("");
    }, 5000);
  };
  return (
    <NotificationContext value={{ notification, setNotification }}>
      {children}
    </NotificationContext>
  );
};

export { NotificationContext };
