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