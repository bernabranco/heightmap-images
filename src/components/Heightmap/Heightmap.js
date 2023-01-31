import { React } from "react";
import { ImageDisplay } from "./components/Image/ImageDisplay";
import { exportImage } from "../Exporter/ExportImage";
import { exportPreset } from "../Exporter/ExportPreset";
import { Button, ButtonContainer } from "../../styles/App.styles";
import { openFullscreen } from "../../utils/OpenFullscreen";
import Threejs from "./components/Threejs/Threejs";
import { Audio } from "../Audio/Audio";

export default function Heightmap() {
  return (
    <div style={{ boxSizing: "border-box", padding: "2rem" }}>
      <Audio />
      <ButtonContainer>
        <Button onClick={openFullscreen}>Go Fullscreen</Button>
        <Button onClick={exportImage}>Export Image</Button>
        <Button onClick={exportPreset}>Export Preset</Button>
      </ButtonContainer>
      <ImageDisplay />
      <Threejs id="canvasExport" width="8000" height="8000" />
    </div>
  );
}
