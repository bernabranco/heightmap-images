import { attributes } from "./attributes.js";
import { uniforms } from "./uniforms";
const vertexShader = `
  ${attributes}
  ${uniforms}

  varying vec3 vColor;

  float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
  }

  vec3 applyPhysics(vec3 newPosition, vec3 acc){
    float speed = u_speed*u_time;
    newPosition.x += u_noise_x*acc.x*sin(speed*u_amplitude_x + u_speed*u_time);
    newPosition.y += u_noise_y*acc.y*sin(speed*u_amplitude_y + u_speed*u_time);
    newPosition.z += u_noise_z*acc.z*sin(speed*u_amplitude_z + u_speed*u_time);
    return newPosition;
  }

  vec3 applyOffset(vec3 newPosition, float sound, float soundZ){
    if(sound > 0.0 ) {
      newPosition.x *= u_offset_x + sound;
      newPosition.y *= u_offset_y + sound;
      newPosition.z *= u_offset_z + sound;
    } else {
      newPosition.x *= u_offset_x;
      newPosition.y *= u_offset_y;
      newPosition.z *= u_offset_z;
    }
    return newPosition;
  }
     
  void main() {
    vColor = color;
    vec3 vertexPosition = position;
    vec3 acc = acceleration;

    float sound = u_sound * u_sound_intensity;

    // apply position effects
    vertexPosition.xyz = applyPhysics(vertexPosition, acc);
    vertexPosition.xyz = applyOffset(vertexPosition, sound, 1.0);

    // apply size capabilities
    gl_PointSize = u_size + size;

    // position points
    vec4 mvPosition = modelViewMatrix * vec4(vertexPosition, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export { vertexShader };
