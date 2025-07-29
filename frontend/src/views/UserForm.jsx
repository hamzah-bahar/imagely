import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";
import Loading from "../components/Loading";

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    id: null,
    username: "",
    email: "",
    is_admin: 0,
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          setUser(data.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors(null);
    setLoading(true);

    if (id) {
      axiosClient
        .put(`/users/${id}`, user)
        .then(() => {
          navigate("/users");
          setLoading(false);
        })
        .catch((error) => {
          const { response } = error;
          setErrors(response.data.errors);
          setLoading(false);
        });
    } else {
      axiosClient
        .post("/users", user)
        .then(() => {
          navigate("/users");
          setLoading(false);
        })
        .catch((error) => {
          const { response } = error;
          setErrors(response.data.errors);
          setLoading(false);
        });
    }
  };

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {loading && (
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <Loading />
          </div>
        </div>
      )}
      {errors && (
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            {Object.keys(errors).map((key) => (
              <div
                key={key}
                className="border border-dashed p-2 rounded-lg text-lg text-red-600 my-4"
              >
                {errors[key]}
              </div>
            ))}
          </div>
        </div>
      )}
      {!loading && (
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            {!id && (
              <h2 className="text-xl text-gray-800 font-bold sm:text-3xl">
                Create new user
              </h2>
            )}
            {id && (
              <h2 className="text-xl text-gray-800 font-bold sm:text-3xl">
                Update user {user.username}
              </h2>
            )}
          </div>

          <div className="mt-5 p-4 relative z-10 bg-white border border-gray-200 rounded-xl sm:mt-10 md:p-10">
            <form onSubmit={onSubmit}>
              <div className="mb-4 sm:mb-8">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium"
                >
                  Username
                </label>
                <input
                  value={user.username}
                  onChange={(ev) =>
                    setUser({ ...user, username: ev.target.value })
                  }
                  type="text"
                  id="username"
                  className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  placeholder="User name"
                  autoComplete="false"
                />
              </div>

              <div className="mb-4 sm:mb-8">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Email
                </label>
                <input
                  value={user.email}
                  onChange={(ev) =>
                    setUser({ ...user, email: ev.target.value })
                  }
                  type="email"
                  id="email"
                  className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  placeholder="Email address"
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="userRole"
                  className="block mb-2 text-sm font-medium"
                >
                  User Role
                </label>
              </div>
              {/* End Col */}

              <div className="sm:col-span-9 mb-4 mt-0">
                <div className="sm:flex">
                  <label
                    htmlFor="roleAdmin"
                    className="flex py-2 px-3 w-full border border-gray-200 shadow-2xs -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <input
                      onChange={(e) => {
                        setUser({ ...user, is_admin: e.target.value });
                      }}
                      type="radio"
                      className="shrink-0 mt-0.5 border-gray-300 rounded-full text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      id="roleAdmin"
                      value={1}
                      checked={user.is_admin == 1}
                    />
                    <span className="sm:text-sm text-gray-500 ms-3">Admin</span>
                  </label>

                  <label
                    htmlFor="roleUser"
                    className="flex py-2 px-3 w-full border border-gray-200 shadow-2xs -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <input
                      onChange={(e) => {
                        setUser({ ...user, is_admin: e.target.value });
                      }}
                      type="radio"
                      value={0}
                      className="shrink-0 mt-0.5 border-gray-300 rounded-full text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      id="roleUser"
                      checked={user.is_admin == 0}
                    />
                    <span className="sm:text-sm text-gray-500 ms-3">
                      Regular User
                    </span>
                  </label>
                </div>
              </div>
              {/* End Col */}

              <div className="mb-4 sm:mb-8">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    onChange={(ev) =>
                      setUser({ ...user, password: ev.target.value })
                    }
                    type="password"
                    id="password"
                    className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Password"
                  ></input>
                </div>
              </div>
              <div>
                <label
                  htmlFor="passwordConfirmation"
                  className="block mb-2 text-sm font-medium"
                >
                  Password Confirmation
                </label>
                <div className="mt-1">
                  <input
                    onChange={(ev) =>
                      setUser({
                        ...user,
                        password_confirmation: ev.target.value,
                      })
                    }
                    type="password"
                    id="passwordConfirmation"
                    className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Password Confirmation"
                  ></input>
                </div>
              </div>
              <div className="mt-6 grid">
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {id ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
