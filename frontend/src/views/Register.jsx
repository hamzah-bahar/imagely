import { use, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { UserContext } from "../contexts/UserProvider";

export default function Register() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { setToken } = use(UserContext);
  const [errors, setErrors] = useState(null);
  const onSubmit = (e) => {
    e.preventDefault();
    setErrors(null);
    const payload = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    axiosClient
      .post("/register", payload)
      .then(({ data }) => {
        setToken(data.token);
      })
      .catch((error) => {
        const { response } = error;
        setErrors(response.data.errors);
      });
  };
  return (
    <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-2xs max-w-xl mx-auto w-full animate-slide-in">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800">
            Register a new account
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?
            <Link
              className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
              to="/login"
            >
              Login here
            </Link>
          </p>
        </div>
        {errors && (
          <>
            {Object.keys(errors).map((key) => (
              <div
                key={key}
                className="border border-dashed p-2 rounded-lg text-lg text-red-600 my-4"
              >
                {errors[key]}
              </div>
            ))}
          </>
        )}
        <div className="mt-5">
          {/* Form */}
          <form onSubmit={onSubmit}>
            <div className="grid gap-y-4">
              {/* Form Group */}
              <div>
                <label htmlFor="username" className="block text-sm mb-2">
                  Username
                </label>
                <div className="relative">
                  <input
                    ref={usernameRef}
                    type="text"
                    id="username"
                    className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    required
                    aria-describedby="username-error"
                  />
                  <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                    <svg
                      className="size-5 text-red-500"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>
                  </div>
                </div>
                <p
                  className="hidden text-xs text-red-600 mt-2"
                  id="username-error"
                >
                  Please include a valid email address so we can get back to you
                </p>
              </div>
              {/* End Form Group */}
              {/* Form Group */}
              <div>
                <label htmlFor="email" className="block text-sm mb-2">
                  Email address
                </label>
                <div className="relative">
                  <input
                    ref={emailRef}
                    type="email"
                    id="email"
                    className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    required
                    aria-describedby="email-error"
                  />
                  <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                    <svg
                      className="size-5 text-red-500"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>
                  </div>
                </div>
                <p
                  className="hidden text-xs text-red-600 mt-2"
                  id="email-error"
                >
                  Please include a valid email address so we can get back to you
                </p>
              </div>
              {/* End Form Group */}

              {/* Form Group */}
              <div>
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <label htmlFor="password" className="block text-sm mb-2">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    ref={passwordRef}
                    type="password"
                    id="password"
                    className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    required
                    aria-describedby="password-error"
                  />
                </div>
                <p
                  className="hidden text-xs text-red-600 mt-2"
                  id="password-error"
                >
                  8+ characters required
                </p>
              </div>
              {/* End Form Group */}

              {/* Form Group */}
              <div>
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <label
                    htmlFor="password_confirmation"
                    className="block text-sm mb-2"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    ref={passwordConfirmationRef}
                    type="password"
                    id="password_confirmation"
                    className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    required
                  />
                </div>
              </div>
              {/* End Form Group */}

              <button
                type="submit"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Register
              </button>
            </div>
          </form>
          {/* End Form */}
        </div>
      </div>
    </div>
  );
}
