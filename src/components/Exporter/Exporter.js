import { imagesData } from "../../pages/LoadImages/LoadImages";

// Export single image
export function exportImage(frameCount) {
  var canvas = document.getElementById("canvasExport");
  var dataURL = canvas.toDataURL("image/jpeg");

  var downloadLink = document.createElement("a");
  downloadLink.download = "particle" + frameCount;
  downloadLink.href = dataURL;

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

export function exportText(frameCount) {
  const values = `
      ${JSON.stringify(imagesData)}
  `;

  var FileSaver = require("file-saver");
  var blob = new Blob([values], { type: "text/plain;charset=utf-8" });
  FileSaver.saveAs(blob, "particle-2d-grid-" + frameCount);
}
