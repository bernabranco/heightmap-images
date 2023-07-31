import React from "react";
import { Button } from "../../../../styles/common.styles";

export default function Fullscreen() {
  const openFullscreen = () => {
    const elem = document.getElementById("canvasExport");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  };

  return <Button onClick={openFullscreen}>Go Fullscreen</Button>;
}
