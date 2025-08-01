import { Link } from "react-router-dom";

export default function ImageCard({ image }) {
  return (
    <Link to={`/home/images/show/${image.slug}`}>
      <div className="group flex flex-col">
        <div className="relative">
          <div className="aspect-2/3 overflow-hidden rounded-2xl">
            <img
              className="size-full object-cover rounded-2xl"
              src={image.path}
              alt={image.title}
            />
          </div>

          <div className="pt-4">
            <h3 className="font-medium md:text-lg text-black">{image.title}</h3>
            <p className="mt-2 text-black">{image.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
