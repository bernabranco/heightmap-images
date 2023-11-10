import React from "react";
import { ImageDisplay } from "./components/ImageDisplay/ImageDisplay";
import Audio from "./components/Audio/Audio";
import Exporter from "./components/Exporter/Exporter";
import { MenuContainer } from "./Menu.styles";
import Fullscreen from "./components/Fullscreen/Fullscreen";
import PoseNet from "../Posenet/Posenet";

export default function Menu() {
  return (
    <MenuContainer>
      <ImageDisplay />
      <Audio />
      <Exporter />
      <Fullscreen />
      {/* <PoseNet /> */}
    </MenuContainer>
  );
}
