import React from "react";
import { useNavigate } from "react-router";
import ImageUploadComponent from "../../components/ImageUpload/ImageUpload";
import { useImageContext } from "../../store/ImageContext";
import { Button } from "../../styles/common.styles";

const LoadImages = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const { imageLoading } = useImageContext();

  console.log(imageLoading);

  return (
    <>
      <Button
        onClick={goToDashboard}
        style={{
          backgroundColor: "darkgreen",
          height: 50,
          position: "absolute",
          right: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        disabled={!imageLoading}
      >
        Start
      </Button>

      <ImageUploadComponent />
    </>
  );
};

export default LoadImages;
