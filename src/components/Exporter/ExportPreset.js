import * as gui from "../Gui/Gui";

const getPresetProperties = () => {
  return `
    // core properties
    export const vertex_animate = ${gui.params.animate};
    export const vertex_number = ${gui.params.particleCount};
    
    export const vertex_size = ${gui.params.particleSize};
    export const vertex_speed = ${gui.params.particleSpeed};
    
    // position properties
    export const vertex_offset_x = ${gui.params.offsetX};
    export const vertex_offset_y = ${gui.params.offsetY};
    export const vertex_offset_z = ${gui.params.offsetZ};
    
    // movement properties
    export const vertex_noise_x = ${gui.params.noiseX};
    export const vertex_noise_y = ${gui.params.noiseY};
    export const vertex_noise_z = ${gui.params.noiseZ};
    
    export const vertex_amplitude_x = ${gui.params.amplitudeX};
    export const vertex_amplitude_y = ${gui.params.amplitudeY};
    export const vertex_amplitude_z = ${gui.params.amplitudeZ};
    
    export const mesh_rotation_x = ${gui.params.rotationX};
    export const mesh_rotation_y = ${gui.params.rotationY};
    export const mesh_rotation_z = ${gui.params.rotationZ};
    
    export const initial_mesh_rotation_x = 0;
    export const initial_mesh_rotation_y = 0;
    export const initial_mesh_rotation_z = -Math.PI / 2;
    
    // color properties
    export const scene_background_color = '${gui.params.backgroundColor}';
    export const vertex_red = ${gui.params.vertexRed};
    export const vertex_green = ${gui.params.vertexGreen};
    export const vertex_blue = ${gui.params.vertexBlue};
    export const vertex_contrast = ${gui.params.colorContrast};
    
    // sound properties
    export const vertex_sound_intensity = ${gui.params.soundIntensity};
    
    // post processing properties
    export const scene_enable_composer = ${gui.params.enableComposer};
    export const vertex_drag = ${gui.params.exposure};
    export const vertex_bloom_radius = ${gui.params.bloomRadius};
    export const vertex_bloom_strength = ${gui.params.bloomStrength};
    export const vertex_bloom_threshold = ${gui.params.bloomThreshold};
    
    // camera properties
    export const camera_fov = 50;
    export const camera_near = 1;
    export const camera_far = 100000;
    export const camera_zoom = 900;
    
    // image properties
    export const image_list_size = 33;
    `;
};

export function exportPreset() {
  // download preset
  const values = getPresetProperties();
  var FileSaver = require("file-saver");
  var blob = new Blob([values], { type: "text/plain;charset=utf-8" });
  FileSaver.saveAs(blob, "preset-1.js");
}
