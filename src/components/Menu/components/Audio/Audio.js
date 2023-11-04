import React, { useEffect, useState } from "react";
import { AudioContainer, Info, Title } from "./Audio.styles";

let frequency;
let volume;

function Audio() {
  const [volumeValue, setVolumeValue] = useState("");
  const [frequencyValue, setFrequencyValue] = useState("");

  useEffect(() => {
    let isMounted = true; // Flag to track whether the component is mounted

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
        if (isMounted) {
          analyser.getByteFrequencyData(data);
          var idx = 0;
          for (var j = 0; j < analyser.frequencyBinCount; j++) {
            if (data[j] > data[idx]) {
              idx = j;
            }
          }

          frequency = (idx * ctx.sampleRate) / analyser.fftSize;
          // to display in UI
          setFrequencyValue(frequency.toFixed(2));
        }
      }

      function analyzeVolume() {
        if (isMounted) {
          analyser.getByteTimeDomainData(buffer);
          volume = 0;
          for (var i = 0; i < buffer.length; i++) {
            volume += buffer[i] * buffer[i];
          }

          volume /= buffer.length;
          //-127 so that silence is 0
          volume = (Math.sqrt(volume) - 127) * 2;
          // to display in UI
          setVolumeValue(volume.toFixed(2));
        }
      }

      function update() {
        if (isMounted) {
          analyzeFrequency();
          analyzeVolume();
          requestAnimationFrame(update);
        }
      }

      update();

      return () => {
        isMounted = false; // Set the flag to indicate that the component is unmounted
        ctx.close().catch(console.error); // Close the AudioContext
        stream.getTracks().forEach((track) => track.stop()); // Stop all tracks in the audio stream
      };
    }
  }, []);

  return (
    <AudioContainer>
      <Title>Audio Display</Title>
      <Info>
        {volumeValue ? "volume: " + parseFloat(volume).toFixed(2) : 0}
      </Info>
      <Info>
        {frequencyValue ? "frequency: " + parseFloat(frequency).toFixed(2) : 0}
      </Info>
    </AudioContainer>
  );
}

export { Audio as default, frequency, volume };
