import { use } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/UserProvider";
import Header from "../Header";

export default function DefaultLayout() {
  const { isAuthenticated } = use(UserContext);
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div>
      <Header />
      <div className="relative max-w-5xl w-full md:flex md:items-center md:justify-between md:gap-3 mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <Outlet />
      </div>
    </div>
  );
}
