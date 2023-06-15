import { React } from "react";
import { ImageDisplay } from "../../components/Image/ImageDisplay";
import { exportImage } from "../../components/Exporter/ExportImage";
import { exportPreset } from "../../components/Exporter/ExportPreset";
import { Button, ButtonContainer } from "../../styles/App.styles";
import { openFullscreen } from "../../utils/OpenFullscreen";
import Threejs from "../../components/ImageProcessing/Threejs";
import { Audio } from "../../components/Audio/Audio";

export default function Dashboard() {
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
