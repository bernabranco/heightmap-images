import { React, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import Threejs from "../../components/ImageProcessing/Threejs";
import Menu from "../../components/Menu/Menu";
import { useImageContext } from "../../store/ImageContext";

export default function Dashboard() {
  const { uploadedImages } = useImageContext();

  const navigate = useNavigate();

  const goToStartScreen = useCallback(() => {
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    if (uploadedImages.length === 0) {
      goToStartScreen();
    }

    console.log("Dashboard.js - Uploaded Images:");

    console.log({ uploadedImages: uploadedImages });
  }, [uploadedImages, goToStartScreen]);

  return (
    <>
      <Menu />
      <Threejs id="canvasExport" width="8000" height="8000" />
    </>
  );
}
