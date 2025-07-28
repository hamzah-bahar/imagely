import { Outlet } from "react-router-dom";

import Header from "../Header";

export default function DefaultLayout() {
  return (
    <div>
      <Header />
      <div className="relative max-w-5xl w-full md:flex md:items-center md:justify-between md:gap-3 mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <Outlet />
      </div>
    </div>
  );
}
