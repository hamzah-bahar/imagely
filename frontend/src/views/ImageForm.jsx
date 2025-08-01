import { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";
import Loading from "../components/Loading";
import { NotificationContext } from "../contexts/NotificationProvider";
import { UserContext } from "../contexts/UserProvider";

export default function ImageForm() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({
    title: "",
    description: "",
  });
  const [tempImageUrl, setTempImageUrl] = useState(null);

  const [errors, setErrors] = useState(null);

  const { setNotification } = use(NotificationContext);
  const { user, setUser } = use(UserContext);

  const handleImageChange = (ev) => {
    if (ev.target.files && ev.target.files[0]) {
      const uploadedImage = ev.target.files[0];
      setImage({ ...image, image: uploadedImage });
      // generate temp url
      const url = URL.createObjectURL(uploadedImage);
      setTempImageUrl(url);
    }
  };

  useEffect(() => {
    if (slug) {
      const url = user.is_admin ? `/images/${slug}` : `/home/images/${slug}`;
      setLoading(true);
      axiosClient
        .get(url)
        .then(({ data }) => {
          setImage(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [slug]);

  useEffect(() => {
    axiosClient
      .get("/user")
      .then(({ data }) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("title", image.title);
    formData.append("description", image.description);
    image.image && formData.append("image", image.image);

    const createUrl = user.is_admin ? "/images" : "/home/images";
    const updateUrl = user.is_admin
      ? `/images/${slug}`
      : `/home/images/${slug}`;

    if (slug) {
      axiosClient
        .post(updateUrl, formData, {
          headers: {
            "Content-Type": "Multipart/form-data",
          },
        })
        .then(() => {
          user.is_admin ? navigate("/images") : navigate("/home/user/images");
          setLoading(false);
          setNotification(`Image "${image.title}" was successfuly updated!`);
        })
        .catch((error) => {
          const { response } = error;
          setErrors(response.data.errors);
          setLoading(false);
        });
    } else {
      axiosClient
        .post(createUrl, formData, {
          headers: {
            "Content-Type": "Multipart/form-data",
          },
        })
        .then(() => {
          user.is_admin ? navigate("/images") : navigate("/home/user/images");
          setLoading(false);
          setNotification(`Image "${image.title}" was successfuly created!`);
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
        <div className="mx-auto max-w-2xl animate-slide-in">
          <div className="text-center">
            {!slug && (
              <h2 className="text-xl text-gray-800 font-bold sm:text-3xl">
                Create new image
              </h2>
            )}
            {slug && (
              <h2 className="text-xl text-gray-800 font-bold sm:text-3xl">
                Update image ( {image.title} )
              </h2>
            )}
          </div>
          <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <form onSubmit={onSubmit}>
              <div className="bg-white rounded-xl shadow-xs">
                <div className="pt-0 p-4 sm:pt-0 sm:p-7">
                  {/* Grid */}
                  <div className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="af-submit-app-project-name"
                        className="inline-block text-sm font-medium text-gray-800 mt-2.5"
                      >
                        Image Title
                      </label>

                      <input
                        value={image.title}
                        onChange={(e) =>
                          setImage({ ...image, title: e.target.value })
                        }
                        id="af-submit-app-project-name"
                        type="text"
                        className="py-1.5 sm:py-2 px-3 pe-11 block w-full border border-gray-400 shadow-2xs rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                        placeholder="Enter image title"
                      />
                    </div>
                    {tempImageUrl ? (
                      <div className="space-y-2">
                        <img src={tempImageUrl} alt="temp image" />
                      </div>
                    ) : slug ? (
                      <div className="space-y-2">
                        <img src={image.path} alt={image.title} />
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="space-y-2">
                      <label
                        htmlFor="af-submit-app-upload-images"
                        className="inline-block text-sm font-medium text-gray-800 mt-2.5"
                      >
                        Image
                      </label>

                      <label
                        htmlFor="af-submit-app-upload-images"
                        className="group p-4 sm:p-7 block cursor-pointer text-center border border-dashed border-gray-400 rounded-lg focus-within:outline-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
                      >
                        <input
                          onChange={handleImageChange}
                          id="af-submit-app-upload-images"
                          name="af-submit-app-upload-images"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                        />
                        <svg
                          className="size-10 mx-auto text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
                          />
                          <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                        </svg>
                        <span className="mt-2 block text-sm text-gray-800">
                          Browse your device or{" "}
                          <span className="group-hover:text-blue-700 text-blue-600">
                            drag 'n drop'
                          </span>
                        </span>
                      </label>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="af-submit-app-description"
                        className="inline-block text-sm font-medium text-gray-800 mt-2.5"
                      >
                        Description
                      </label>

                      <textarea
                        onChange={(e) =>
                          setImage({ ...image, description: e.target.value })
                        }
                        id="af-submit-app-description"
                        className="py-1.5 sm:py-2 px-3 block w-full border border-gray-400 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                        rows="6"
                        placeholder="A max of 5 sentences that breifly describe the photo"
                        value={image.description}
                      ></textarea>
                    </div>
                  </div>
                  {/* End Grid */}

                  <div className="mt-5 flex justify-center gap-x-2">
                    <button
                      type="submit"
                      className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {slug ? "Update Image" : "Add Image"}
                    </button>
                  </div>
                </div>
              </div>
              {/* End Card */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
