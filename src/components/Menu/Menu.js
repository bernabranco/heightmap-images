import React, { useState } from "react";
import { ImageDisplay } from "../../components/Image/ImageDisplay";
import { Button } from "../../styles/common.styles";
import { openFullscreen } from "../../utils/OpenFullscreen";
import { Audio } from "../../components/Audio/Audio";
import Exporter from "../../components/Exporter/Exporter";
import {
  ConfigurationsContainer,
  MenuContainer,
  Title,
  OptionsContainer,
  OptionButton,
  SubOptionsContainer,
} from "./Menu.styles";

export default function Menu() {
  const [configurations, setConfigurations] = useState(true);
  const [imageList, setImageList] = useState(true);
  const [exportOptions, setExportOptions] = useState(false);
  const [audioInfo, setAudioInfo] = useState(true);

  const exportTitle = "Export";
  const imageListTitle = "Images";
  const audioTitle = "Audio";

  return (
    <MenuContainer>
      <OptionsContainer>
        <OptionButton
          onClick={() => {
            setConfigurations(!configurations);
          }}
        >
          Configurations
        </OptionButton>
        {configurations && (
          <>
            <OptionButton
              onClick={() => {
                setImageList(!imageList);
              }}
            >
              {imageListTitle}
            </OptionButton>

            {imageList && <ImageDisplay />}

            <OptionButton
              onClick={() => {
                setAudioInfo(!audioInfo);
              }}
            >
              {audioTitle}
            </OptionButton>
            {audioInfo && <Audio />}
            <OptionButton
              onClick={() => {
                setExportOptions(!exportOptions);
              }}
            >
              {exportTitle}
            </OptionButton>
            {exportOptions && <Exporter />}
            <OptionButton onClick={openFullscreen}>Go Fullscreen</OptionButton>
          </>
        )}
      </OptionsContainer>
    </MenuContainer>
  );
}
