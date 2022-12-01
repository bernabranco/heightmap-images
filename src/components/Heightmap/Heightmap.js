import { React, useEffect, useState } from "react";
import { ImageDisplay } from "./components/Image/ImageDisplay";
import { ExportControls } from "../Exporter/Exporter";
import { FullScreenButton } from "../../styles/App.styles";
import { openFullscreen } from "../../utils/OpenFullscreen";
import Threejs from "./components/Threejs/Threejs";
import Loading from "../Loading/Loading";

export default function Heightmap() {
  const [userInterface, setUserInterface] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUserInterface(true);
      setLoading(true);
    }, 5000);
  });

  return (
    <>
      <FullScreenButton onClick={openFullscreen}>
        Go Fullscreen
      </FullScreenButton>
      <ExportControls />
      <ImageDisplay />
      {userInterface && (
        <Threejs id="canvasExport" width="8000" height="8000" />
      )}
      {loading === false && <Loading></Loading>}
    </>
  );
}
