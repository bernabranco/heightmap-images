export const createImageObjects = (uploadedImages) => {
  console.log("ImageContext utils.js - Create Image Objects");

  const imageObjects = uploadedImages.map((uploadedImage) => {
    const imageObject = new Image();
    imageObject.src = uploadedImage.preview;

    return imageObject;
  });

  return imageObjects;
};

export const getImagesData = async (imageList, imgWidth, imgHeight) => {
  console.log("ImageContext utils.js - Get Images Data");

  const imagesData = [];

  const loadImageData = (image) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      canvas.width = imgWidth;
      canvas.height = imgHeight;
      const ctx = canvas.getContext("2d");

      image.onload = () => {
        ctx.drawImage(image, 0, 0, imgWidth, imgHeight);

        // Store image pixel colors
        const imgData = ctx.getImageData(0, 0, imgWidth, imgHeight);
        resolve(imgData);
      };
    });
  };

  const loadingPromises = imageList.map((image) => loadImageData(image));
  const loadedImagesData = await Promise.all(loadingPromises);
  imagesData.push(...loadedImagesData);

  console.log("Images Data: ", imagesData);

  return imagesData;
};
