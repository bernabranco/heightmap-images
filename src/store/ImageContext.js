// ImageContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { createImageObjects, getImagesData } from "./utils";

import { preset } from "../presets/choosePreset";
const traits = require(`../presets/${preset}`);

const imgWidth = Math.pow(traits.vertex_number, 0.5);
const imgHeight = Math.pow(traits.vertex_number, 0.5);

const ImageContext = createContext();

// Custom hook to access the context values
const useImageContext = () => useContext(ImageContext);

const ImageProvider = ({ children }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imagesData, setImagesData] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);

  const imageList = createImageObjects(uploadedImages);

  useEffect(() => {
    const updateImagesData = async () => {
      const newImagesData = await getImagesData(imageList, imgWidth, imgHeight);
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
