import React from "react";
import { Button } from "../../styles/common.styles";
import { exportImage } from "../../components/Exporter/ExportImage";
import { exportPreset } from "../../components/Exporter/ExportPreset";

export default function Exporter() {
  return (
    <>
      <Button onClick={exportImage}>image</Button>
      <Button onClick={exportPreset}>preset</Button>
    </>
  );
}
