import styled from "styled-components";

export const Title = styled.h1`
  display: flex;
  align-items: center;
  color: white;
  font-size: 30px;
  font-weight: bold;
  width: 100%;
  height: 50px;
  text-align: left;
`;

export const DropTitle = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

export const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  color: white;
`;

export const DropzoneContainer = styled.div`
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

export const UploadedImagesContainer = styled.div`
  margin-top: 20px;
  max-height: calc(100vh - 100px);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  z-index: 10;
`;

export const UploadedImage = styled.div`
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

export const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;
