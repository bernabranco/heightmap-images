import { React } from "react";
import Threejs from "../../components/ImageProcessing/Threejs";
import Menu from "../../components/Menu/Menu";

export default function Dashboard() {
  return (
    <>
      <Menu />
      <Threejs id="canvasExport" width="8000" height="8000" />
    </>
  );
}
