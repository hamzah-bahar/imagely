import { use, useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/UserProvider";
import axiosClient from "../../axiosClient";

export default function AdminLayout() {
  const { user, setUser, setToken } = use(UserContext);

  useEffect(() => {
    axiosClient
      .get("/user")
      .then(({ data }) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setUser(null);
      });
  }, []);
  if (!user?.is_admin) {
    return <Navigate to="/login" replace />;
  }

  const onLogout = (e) => {
    e.preventDefault();

    axiosClient
      .post("/logout")
      .then(() => {
        setToken(null);
        setUser(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      {/* ========== HEADER ========== */}
      <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-48 w-full bg-white border-b border-gray-200 text-sm py-2.5 lg:ps-65">
        <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
          <div className="me-5 lg:me-0 lg:hidden">
            {/* Logo */}
            <Link
              className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-hidden track-wider uppercase text-blue-800"
              to="/home"
              aria-label="Imagely"
            >
              Imagely
            </Link>
            {/* End Logo */}

            <div className="lg:hidden ms-1"></div>
          </div>

          <div className="w-full flex items-center justify-end ms-auto md:justify-between gap-x-1 md:gap-x-3">
            <div className="hidden md:block"></div>

            <div className="flex flex-row items-center justify-end gap-1">
              {/* Dropdown */}
              <div className="hs-dropdown relative inline-flex">
                <div
                  className=" min-w-60"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="hs-dropdown-account"
                >
                  <div className="py-3 px-5 bg-gray-100 rounded-t-lg">
                    <p className="text-sm font-medium text-gray-800">
                      {user?.username}
                    </p>
                  </div>
                </div>
                <button
                  id="hs-dropdown-account"
                  type="button"
                  className="size-9.5 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  aria-label="Dropdown"
                >
                  <img
                    className="shrink-0 size-9.5 rounded-full"
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                    alt="Avatar"
                  />
                </button>
              </div>
              {/* End Dropdown */}
            </div>
          </div>
        </nav>
      </header>
      {/* ========== END HEADER ========== */}

      {/* ========== MAIN CONTENT ========== */}
      <div className="-mt-px">
        {/* Breadcrumb */}
        <div className="sticky top-0 inset-x-0 z-20 bg-white border-y border-gray-200 px-4 sm:px-6 lg:px-8 lg:hidden">
          <div className="flex items-center py-2">
            {/* Navigation Toggle */}
            <button
              type="button"
              className="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-hidden focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="hs-application-sidebar"
              aria-label="Toggle navigation"
              data-hs-overlay="#hs-application-sidebar"
            >
              <span className="sr-only">Toggle Navigation</span>
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M15 3v18" />
                <path d="m8 9 3 3-3 3" />
              </svg>
            </button>
            {/* End Navigation Toggle */}

            {/* Breadcrumb */}
            <ol className="ms-3 flex items-center whitespace-nowrap">
              <li className="flex items-center text-sm text-gray-800">
                Application Layout
                <svg
                  className="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </li>
              <li
                className="text-sm font-semibold text-gray-800 truncate"
                aria-current="page"
              >
                Dashboard
              </li>
            </ol>
            {/* End Breadcrumb */}
          </div>
        </div>
        {/* End Breadcrumb */}
      </div>

      {/* Sidebar */}
      <div
        id="hs-application-sidebar"
        className="hs-overlay  [--auto-close:lg]
  hs-overlay-open:translate-x-0
  -translate-x-full transition-all duration-300 transform
  w-65 h-full
  hidden
  fixed inset-y-0 start-0 z-60
  bg-white border-e border-gray-200
  lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
 "
        role="dialog"
        tabIndex="-1"
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col h-full max-h-full">
          <div className="px-6 pt-4 flex items-center">
            {/* Logo */}
            <Link
              className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-hidden track-wider uppercase text-blue-800"
              to="/home"
              aria-label="Imagely"
            >
              Imagely
            </Link>
            {/* End Logo */}

            <div className="hidden lg:block ms-2"></div>
          </div>

          {/* Content */}
          <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
            <nav
              className="hs-accordion-group p-3 w-full flex flex-col h-[100%] justify-between flex-wrap"
              data-hs-accordion-always-open
            >
              <ul className="flex flex-col space-y-1">
                <li>
                  <Link
                    className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                    to={"/dashboard"}
                  >
                    <svg
                      className="shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                    to={"/users"}
                  >
                    <svg
                      className="shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    Users
                  </Link>
                </li>
              </ul>
              <button
                onClick={onLogout}
                type="button"
                aria-label="Logout"
                className="p-2 w-full flex items-center text-sm text-gray-900 hover:text-gray-900 focus:outline-hidden"
              >
                <svg
                  className="shrink-0 size-4 me-3 md:me-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Logout
              </button>
            </nav>
          </div>
          {/* End Content */}
        </div>
      </div>
      {/* End Sidebar */}

      {/* Content */}
      <div className="w-full lg:ps-64">
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <Outlet />
        </div>
      </div>
      {/* End Content */}
      {/* ========== END MAIN CONTENT ========== */}
    </>
  );
}
