import { React, useEffect } from "react";
import { useNavigate } from "react-router";
import { Audio } from "../../components/Menu/components/Audio/Audio";
import Threejs from "../../components/ImageProcessing/Threejs";
import Menu from "../../components/Menu/Menu";
import { useImageContext } from "../../store/ImageContext";

export default function Dashboard() {
  const { uploadedImages } = useImageContext();

  const navigate = useNavigate();

  const goToStartScreen = () => {
    navigate("/");
  };

  useEffect(() => {
    if (uploadedImages.length === 0) {
      goToStartScreen();
    }
  }, [uploadedImages]);

  return (
    <>
      <Menu />
      <Threejs id="canvasExport" width="8000" height="8000" />
    </>
  );
}
