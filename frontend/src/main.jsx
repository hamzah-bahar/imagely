import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { UserProvider } from "./contexts/UserProvider.jsx";
import { NotificationProvider } from "./contexts/NotificationProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NotificationProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </NotificationProvider>
  </StrictMode>
);
