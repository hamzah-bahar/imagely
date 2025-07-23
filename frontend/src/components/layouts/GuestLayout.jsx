import { use } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/UserProvider";
import Header from "../Header";

export default function GuestLayout() {
  const { isAuthenticated, isAdmin } = use(UserContext);
  if (isAuthenticated() && isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  } else if (isAuthenticated()) {
    return <Navigate to="/home" replace />;
  }
  return (
    <>
      <div className="flex items-center justify-center mt-8 px-4 sm:px-6 lg:px-8 py-2">
        <Link
          className="flex-none font-semibold text-3xl text-gray-900 focus:outline-hidden uppercase tracking-wider"
          to="/home"
          aria-label="Brand"
        >
          Imagely
        </Link>
      </div>
      <div className="relative max-w-5xl w-full md:flex md:items-center md:justify-between md:gap-3 mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <Outlet />
      </div>
    </>
  );
}
