import { use, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { UserContext } from "../contexts/UserProvider";
import Loading from "../components/Loading";

export default function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { setToken } = use(UserContext);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors(null);
    setLoading(true);
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setToken(data.token);
        setLoading(false);
      })
      .catch((error) => {
        const { response } = error;
        setErrors(response.data.errors);
        setLoading(false);
        passwordRef.current.value = "";
      });
  };

  return (
    <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-2xs max-w-xl mx-auto w-full animate-slide-in">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800">
            Welcome back! Login
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account yet?
            <Link
              className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
              to="/register"
            >
              Register here
            </Link>
          </p>
        </div>

        <div className="mt-5">
          {/* Form */}
          <form onSubmit={onSubmit}>
            <div className="grid gap-y-4">
              {/* Form Group */}
              <div>
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
                <label htmlFor="email" className="block text-sm mb-2">
                  Email address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    ref={emailRef}
                    className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    required
                    aria-describedby="email-error"
                  />
                </div>
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
                    type="password"
                    id="password"
                    ref={passwordRef}
                    className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    required
                    aria-describedby="password-error"
                  />
                </div>
              </div>
              {/* End Form Group */}

              {!loading && (
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Login
                </button>
              )}
              {loading && <Loading />}
            </div>
          </form>
          {/* End Form */}
        </div>
      </div>
    </div>
  );
}
