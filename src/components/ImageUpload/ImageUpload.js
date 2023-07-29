import React, { useContext } from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import ImageContext from "../../store/ImageContext";

const Title = styled.h1`
  display: flex;
  align-items: center;
  color: white;
  font-size: 30px;
  font-weight: bold;
  width: 100%;
  height: 50px;
  text-align: left;
`;

const DropTitle = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  color: white;
`;

const DropzoneContainer = styled.div`
  border: 2px dashed #ddd;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
  width: 100%;
  max-height: calc(100vh - 150px);
  padding: 20px;
  overflow-y: scroll;
`;

const UploadedImagesContainer = styled.div`
  margin-top: 20px;
  max-height: calc(100vh - 100px);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  z-index: 10;
`;

const UploadedImage = styled.div`
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

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
      <Dropzone onDrop={onDrop} accept="image/*" multiple>
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
