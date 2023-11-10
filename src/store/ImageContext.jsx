import React, { createContext, useState, useContext, useEffect } from "react";
import { createImageObjects, getImagesData } from "./utils";

import { preset } from "../presets/preset";

const imgWidth = Math.pow(preset.core.particleCount, 0.5);
const imgHeight = Math.pow(preset.core.particleCount, 0.5);

const ImageContext = createContext();

const useImageContext = () => useContext(ImageContext);

const ImageProvider = ({ children }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imagesData, setImagesData] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    const updateImagesData = async () => {
      const newImagesData = await getImagesData(
        createImageObjects(uploadedImages),
        imgWidth,
        imgHeight
      );

      console.log({ newImagesData: newImagesData });

      setImagesData(newImagesData);

      if (uploadedImages.length > 0) {
        setImageLoading(true);
      }
    };

    updateImagesData();
  }, [uploadedImages]);

  return (
    <ImageContext.Provider
      value={{ uploadedImages, setUploadedImages, imagesData, imageLoading }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export { ImageProvider, useImageContext, ImageContext as default };
