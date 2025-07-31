import { createContext, useState } from "react";

const ImageContext = createContext({
  images: [],
  setImages: () => {},
});

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  return <ImageContext value={{ images, setImages }}>{children}</ImageContext>;
};
export { ImageContext };
