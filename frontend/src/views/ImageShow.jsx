import { use, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";
import { UserContext } from "../contexts/UserProvider";
import { NotificationContext } from "../contexts/NotificationProvider";

export default function ImageShow() {
  const { slug } = useParams();
  const [image, setImage] = useState({});
  const { user, setUser } = use(UserContext);
  const { setNotification } = use(NotificationContext);
  const navigate = useNavigate();

  const getImage = () => {
    if (slug) {
      axiosClient
        .get("/home/images/" + slug)
        .then(({ data }) => {
          setImage(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getUser = () => {
    axiosClient
      .get("/user")
      .then(({ data }) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageDelete = () => {
    if (
      !window.confirm(`Are you sure you want to delete image? ${image.title}`)
    ) {
      return;
    }
    axiosClient
      .delete(`/home/images/${image.id}`)
      .then(() => {
        user.is_admin ? navigate("/images") : navigate("/home/user/images");
        setNotification(`Image ${image.title} was successfuly deleted!`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getImage();
    getUser();
  }, []);

  return (
    <div className="max-w-[85rem] mx-auto">
      <div className="grid gap-y-8 lg:gap-y-0">
        {/* Content */}
        <div className="lg:col-span-2">
          <div className="py-8">
            <div className="space-y-5 lg:space-y-8">
              <h3 className="text-2xl font-semibold">{image.title}</h3>
              <figure>
                <img
                  className="w-full object-cover rounded-xl"
                  src={image.path}
                  alt={image.title}
                />
              </figure>
              <p className="text-lg text-gray-800">{image.description}</p>
              {user?.email == image.useremail && (
                <div className="flex size-px align-center gap-x-3 text-start">
                  <Link
                    className="block mb-2"
                    to={`/home/images/${image.slug}`}
                  >
                    <span className="py-2 px-4 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full">
                      <svg
                        className="size-2.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                      Edit
                    </span>
                  </Link>
                  <button className="block" onClick={() => handleImageDelete()}>
                    <span className="py-2 px-4 inline-flex items-center gap-x-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                      <svg
                        className="size-2.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                      </svg>
                      Delete
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
