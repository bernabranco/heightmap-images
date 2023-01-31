import { React, useEffect, useState } from "react";
import { StyledInfo, StyledTitle } from "./Audio.styles";

let frequency;
let volume;

function Audio() {
  const [volumeValue, setVolumeValue] = useState("");
  const [frequencyValue, setFrequencyValue] = useState("");
  useEffect(() => {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    navigator.getUserMedia(
      { video: false, audio: true },
      getSound,
      console.log
    );

    function getSound(stream) {
      var ctx = new AudioContext();
      var mic = ctx.createMediaStreamSource(stream);
      var analyser = ctx.createAnalyser();
      mic.connect(analyser);

      var data = new Uint8Array(analyser.frequencyBinCount);
      var buffer = new Uint8Array(analyser.fftSize);

      function analyzeFrequency() {
        analyser.getByteFrequencyData(data);
        var idx = 0;
        for (var j = 0; j < analyser.frequencyBinCount; j++) {
          if (data[j] > data[idx]) {
            idx = j;
          }
        }

        frequency = (idx * ctx.sampleRate) / analyser.fftSize;
        // to display in UI
        setFrequencyValue(frequency);
      }

      function analyzeVolume() {
        analyser.getByteTimeDomainData(buffer);
        volume = 0;
        for (var i = 0; i < buffer.length; i++) {
          volume += buffer[i] * buffer[i];
        }

        volume /= buffer.length;
        //-127 so that silence is 0
        volume = (Math.sqrt(volume) - 127) * 2;
        // to display in UI
        setVolumeValue(volume);
      }

      function update() {
        analyzeFrequency();
        analyzeVolume();
        requestAnimationFrame(update);
      }

      update();
    }
  }, []);

  return (
    <>
      <StyledTitle>Mic Volume: </StyledTitle>
      <StyledInfo>{volumeValue ? volumeValue : 0}</StyledInfo>
      <StyledTitle>Mic Frequency: </StyledTitle>
      <StyledInfo>{frequencyValue ? frequencyValue : 0}</StyledInfo>
    </>
  );
}

export {
  //Audio component for App.js
  Audio,
  //frequency value for Three.js
  frequency,
  //volume value for Three.js
  volume,
};
