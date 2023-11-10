import { attributes } from "../attributes.js";
import { uniforms } from "../uniforms";
import { curlNoise } from "../noise_functions/curlNoise";
import { applyPhysics } from "./utils/vertexApplyPhysics.js";
import { applyOffset } from "./utils/vertexApplyOffset.js";
import { applyPerlinNoise } from "./utils/vertexApplyPerlinNoise.js";

const vertexShader = `
  ${attributes}

  ${uniforms}

  varying vec3 vColor;

  ${curlNoise}

  float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
  }

  ${applyPhysics}

  ${applyOffset}

  vec3 applyRandomPosition(vec3 newPosition){
    newPosition.x *= rand(vec2(u_offset_x*newPosition.x, u_offset_x*newPosition.x));
    newPosition.y *= rand(vec2(u_offset_y*newPosition.y, u_offset_y*newPosition.y));
    return newPosition;
  }

  vec3 applyCurlNoise(vec3 newPosition, float time, float u_amplitude_x, float u_amplitude_y, float u_amplitude_z){
    if(u_amplitude_x > 0.0){
      newPosition.x *= curlNoise(newPosition.xyz*u_amplitude_x + time).x;
    }
    if(u_amplitude_y > 0.0){
      newPosition.y *= curlNoise(newPosition.xyz*u_amplitude_y + time).y;
    }
    if(u_amplitude_z > 0.0){
      newPosition.z *= curlNoise(newPosition.xyz*u_amplitude_z + time).z;
    }
    return newPosition;
  }

  ${applyPerlinNoise}

  // vec3 applySinCos1(vec3 newPosition){
  //   newPosition.x += sin(u_noise_x * newPosition.x + u_amplitude_x*u_time*u_speed);
  //   newPosition.x += cos(u_noise_y * newPosition.y + u_amplitude_y*u_time*u_speed);
  //   return newPosition;
  // }

  // vec3 applySinCos2(vec3 newPosition){
  //   newPosition.x += sin(u_noise_x * newPosition.y + u_amplitude_x*u_time*u_speed);
  //   newPosition.x += cos(u_noise_y * newPosition.x + u_amplitude_y*u_time*u_speed);
  //   return newPosition;
  // }
    
  void main() {
    vColor = color;
    vec3 vertexPosition = position;
    vec3 acc = acceleration;

    float sound = u_sound_intensity;

    float time = u_time * u_speed;

    // apply position effects
    vertexPosition.xyz = applyPhysics(vertexPosition, time, acc);
    vertexPosition.xyz = applyOffset(vertexPosition, time, sound);
    // vertexPosition.xyz =  applyPerlinNoise(vertexPosition);
    // vertexPosition.xyz =  applySinCos1(vertexPosition);
    
    // position points
    vec4 mvPosition = modelViewMatrix * vec4(vertexPosition, 1.0);

    // apply size capabilities
    gl_PointSize = u_size * size;

    gl_Position = projectionMatrix * mvPosition;
  }
`;

export { vertexShader };
