import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Users from "./views/Users";
import NotFound from "./views/NotFound";
import GuestLayout from "./components/layouts/GuestLayout";
import DefaultLayout from "./components/layouts/DefaultLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import Dashboard from "./views/Dashboard";
import Home from "./views/Home";
import UserForm from "./views/UserForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [{ path: "/home", element: <Home /> }],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/users/create",
        element: <UserForm key="userCreate" />,
      },
      {
        path: "/users/:id",
        element: <UserForm key="userUpdate" />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
