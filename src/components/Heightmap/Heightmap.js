import { React } from "react";
import { ImageDisplay } from "./components/Image/ImageDisplay";
import { exportImage, exportText } from "../Exporter/Exporter";
import { Button, ButtonContainer } from "../../styles/App.styles";
import { openFullscreen } from "../../utils/OpenFullscreen";
import Threejs from "./components/Threejs/Threejs";

export default function Heightmap() {
  return (
    <div style={{boxSizing:'border-box', padding:'2rem'}}>
      <ButtonContainer>     
        <Button onClick={openFullscreen}>
          Go Fullscreen
        </Button>
        <Button onClick={exportImage}>
          Export Image
        </Button>
        <Button onClick={exportText}>
          Export Info
        </Button>
      </ButtonContainer>
      <ImageDisplay />
      <Threejs id="canvasExport" width="8000" height="8000" />
    </div>
  );
}
