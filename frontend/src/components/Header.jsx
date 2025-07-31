import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserProvider";
import { use, useEffect, useState } from "react";
import axiosClient from "../axiosClient";

export default function Header() {
  const { user, token, setToken, setUser } = use(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (token) {
      axiosClient
        .get("/user")
        .then(({ data }) => {
          setUser(data);
          if (data.is_admin == 0) {
            setIsAdmin(false);
          } else {
            setIsAdmin(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setUser(null);
          setToken(null);
        });
    }
  }, []);
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
    <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full bg-gray-50 border-b border-gray-200 shadow-sm">
      <nav className="relative max-w-5xl w-full md:flex md:items-center md:justify-between md:gap-3 mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          <Link
            className="flex-none font-semibold text-xl text-gray-900 focus:outline-hidden uppercase tracking-wider"
            to="/home"
            aria-label="Brand"
          >
            Imagely
          </Link>

          {/* Collapse Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="hs-collapse-toggle relative size-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-white/50 text-white hover:bg-white/10 focus:outline-hidden focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none"
              id="hs-base-header-collapse"
              aria-expanded="false"
              aria-controls="hs-base-header"
              aria-label="Toggle navigation"
              data-hs-collapse="#hs-base-header"
            >
              <svg
                className="hs-collapse-open:hidden size-4"
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
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg
                className="hs-collapse-open:block shrink-0 hidden size-4"
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
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
          {/* End Collapse Button */}
        </div>
        {/* End Logo w/ Collapse Button */}

        {/* Collapse */}
        <div
          id="hs-base-header"
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
          aria-labelledby="hs-base-header-collapse"
        >
          <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
            <div className="py-2 md:py-0 flex flex-col md:flex-row md:items-center md:justify-end gap-0.5 md:gap-1">
              {/* Button Group */}
              {token && isAdmin && (
                <Link
                  className="font-bold md:inline-flex items-center justify-center px-2 py-1 text-sm font-semibold text-gray-900 hover:bg-gray-300 focus:outline-hidden focus:bg-gray-400 rounded-lg"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              )}
              {token && !isAdmin && (
                <Link
                  to="/home/images/create"
                  type="button"
                  className="font-bold md:inline-flex items-center justify-center px-2 py-1 text-sm font-semibold text-gray-900 hover:bg-gray-300 focus:outline-hidden focus:bg-gray-400 rounded-lg"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="12"
                      y1="5"
                      x2="12"
                      y2="19"
                      stroke="black"
                      strokeWidth="3"
                    />
                    <line
                      x1="5"
                      y1="12"
                      x2="19"
                      y2="12"
                      stroke="black"
                      strokeWidth="3"
                    />
                  </svg>
                </Link>
              )}
              <div className="relative flex flex-wrap items-center gap-x-1.5 md:ps-2.5 mt-1 md:mt-0 md:ms-1.5 before:block before:absolute before:top-1/2 before:-start-px before:w-px before:h-4 before:bg-white/30 before:-translate-y-1/2">
                {!token && (
                  <Link
                    className="p-2 w-full flex items-center text-sm text-gray-900 hover:text-gray-800 focus:outline-hidden focus:text-gray-800"
                    to="/login"
                  >
                    <svg
                      className="shrink-0 size-4 me-3 md:me-2"
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
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    Login
                  </Link>
                )}
                {token && (
                  <div className="flex items-center justify-between">
                    <Link
                      to="/home/user/images"
                      className="p-2 w-full flex items-center text-sm text-gray-900 hover:text-gray-900 focus:outline-hidden"
                    >
                      {user?.username}
                    </Link>
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
                  </div>
                )}
              </div>
              {/* End Button Group */}
            </div>
          </div>
        </div>
        {/* End Collapse */}
      </nav>
    </header>
  );
}
