export const updateUniformsBasedOnGui = (material, gui, frameCount, volume) => {
  // update shader uiforms
  material.uniforms.u_time.value = frameCount * 0.01;
  material.uniforms.u_speed.value = gui.params.particleSpeed;
  material.uniforms.u_size.value =
    gui.params.particleSize + material.uniforms.u_sound_intensity.value;
  material.uniforms.u_noise_x.value = gui.params.noiseX;
  material.uniforms.u_noise_y.value = gui.params.noiseY;
  material.uniforms.u_noise_z.value = gui.params.noiseZ;
  material.uniforms.u_amplitude_x.value = gui.params.amplitudeX;
  material.uniforms.u_amplitude_y.value = gui.params.amplitudeY;
  material.uniforms.u_amplitude_z.value = gui.params.amplitudeZ;
  material.uniforms.u_offset_x.value =
    gui.params.offsetX + material.uniforms.u_sound_intensity.value;
  material.uniforms.u_offset_y.value =
    gui.params.offsetY + material.uniforms.u_sound_intensity.value;
  material.uniforms.u_offset_z.value = gui.params.offsetZ;
  material.uniforms.u_contrast.value = gui.params.colorContrast;
  material.uniforms.u_vertex_red.value = gui.params.vertexRed;
  material.uniforms.u_vertex_green.value = gui.params.vertexGreen;
  material.uniforms.u_vertex_blue.value = gui.params.vertexBlue;
};

export const updateUniformsBasedOnVolume = (
  material,
  gui,
  frameCount,
  volume
) => {
  material.uniforms.u_sound_intensity.value = gui.params.soundIntensity;
  material.uniforms.u_size.value *= parseFloat(volume);
  material.uniforms.u_offset_x.value *= parseFloat(volume);
  material.uniforms.u_offset_y.value *= parseFloat(volume);
  material.uniforms.u_sound =
    parseFloat(volume) * material.uniforms.u_sound_intensity.value * 100;
};
