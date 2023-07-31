import React from "react";
import { Button } from "../../../../styles/common.styles";
import { exportImage } from "./utils/ExportImage";
import { exportPreset } from "./utils/ExportPreset";

export default function Exporter() {
  return (
    <>
      <Button onClick={exportImage}>Export Image</Button>
      <Button onClick={exportPreset}>Export Preset</Button>
    </>
  );
}
