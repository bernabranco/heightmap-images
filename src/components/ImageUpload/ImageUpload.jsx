import React, { useContext } from "react";
import Dropzone from "react-dropzone";
import ImageContext from "../../store/ImageContext";
import {
  ImageUploadContainer,
  Title,
  DropTitle,
  DropzoneContainer,
  Image,
  UploadedImage,
  UploadedImagesContainer,
} from "./ImageUpload.styles";

const ImageUploadComponent = () => {
  const { uploadedImages, setUploadedImages } = useContext(ImageContext);

  const onDrop = (acceptedFiles) => {
    const images = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setUploadedImages([...uploadedImages, ...images]);
  };

  return (
    <ImageUploadContainer>
      <Title>Welcome to After Image</Title>
      <Dropzone onDrop={onDrop} multiple>
        {({ getRootProps, getInputProps }) => (
          <DropzoneContainer {...getRootProps()}>
            <input {...getInputProps()} />
            <DropTitle>
              Drag & drop images here, or click to select images
            </DropTitle>
            <UploadedImagesContainer>
              {uploadedImages.map((image, index) => (
                <UploadedImage key={index}>
                  <Image src={image.preview} alt={`Uploaded ${index + 1}`} />
                </UploadedImage>
              ))}
            </UploadedImagesContainer>
          </DropzoneContainer>
        )}
      </Dropzone>
    </ImageUploadContainer>
  );
};

export default ImageUploadComponent;
