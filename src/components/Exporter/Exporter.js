import { React } from "react";
import { StyledContainer, StyledButton } from "./Exporter.styles";

//export buttons
export function ExportControls(exportVideo, frameCount, startFrame) {
  return (
    <StyledContainer>
      <StyledButton id="exporter1" onClick={() => ExportImage()}>
        Export Image
      </StyledButton>
    </StyledContainer>
  );
}

// Export single image
export function ExportImage(frameCount) {
  var canvas = document.getElementById("canvasExport");
  var dataURL = canvas.toDataURL("image/jpeg");

  var downloadLink = document.createElement("a");
  downloadLink.download = "particle" + frameCount;
  downloadLink.href = dataURL;

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

export function ExportText(frameCount) {
  const values = `

    `;

  var FileSaver = require("file-saver");
  var blob = new Blob([values], { type: "text/plain;charset=utf-8" });
  FileSaver.saveAs(blob, "particle-2d-grid-" + frameCount);
}
