import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import Loading from "./Loading";
import axiosClient from "../axiosClient";

export default function ImageListing() {
  const [images, setImages] = useState([]);
  const [meta, setMeta] = useState({});
  const [links, setLinks] = useState({});
  const [metaLinks, setMetaLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getImages = () => {
    setLoading(true);
    axiosClient
      .get("/home/images")
      .then(({ data }) => {
        setImages(data.data);
        setMeta(data.meta);
        setMetaLinks(data.meta.links);
        setLinks(data.links);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePagination = (link) => {
    const page = link.slice(link.indexOf("?") + 1);

    setLoading(true);
    axiosClient
      .get(`/home/images?${page}`)
      .then(({ data }) => {
        setImages(data.data);
        setLinks(data.links);
        setMetaLinks(data.meta.links);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div className="mx-auto">
      <>
        <h2 className="text-xl md:text-2xl lg:text-3xl mb-4">Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {loading ? (
            <Loading />
          ) : (
            images.map((image) => <ImageCard key={image.id} image={image} />)
          )}
        </div>
      </>
      {/* Footer */}
      <div className="mt-4 py-6 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200">
        <div className="inline-flex items-center gap-x-2">
          <p className="text-sm text-gray-600">Showing:</p>
          <div className="max-w-sm space-y-3">
            <select
              onChange={(ev) => handlePagination(ev.target.value)}
              className="py-2 px-3 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {metaLinks
                .filter(
                  (link) =>
                    !link.label.includes("Previous") &&
                    !link.label.includes("Next")
                )
                .map((link) => (
                  <option
                    key={link.url}
                    selected={link.active}
                    value={link.url}
                  >
                    {link.label}
                  </option>
                ))}
            </select>
          </div>
          <p className="text-sm text-gray-600">of {meta.total}</p>
        </div>

        <div>
          <div className="inline-flex gap-x-2">
            <button
              disabled={!links.prev}
              onClick={() => {
                handlePagination(links.prev);
              }}
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
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
                <path d="m15 18-6-6 6-6" />
              </svg>
              Prev
            </button>

            <button
              disabled={!links.next}
              onClick={() => {
                handlePagination(links.next);
              }}
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            >
              Next
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
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* End Footer */}
    </div>
  );
}
