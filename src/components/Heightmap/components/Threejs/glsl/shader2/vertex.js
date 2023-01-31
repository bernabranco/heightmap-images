import { attributes } from "../attributes.js";
import { uniforms } from "../uniforms";
import { curlNoise } from "../noise_functions/curlNoise";

const vertexShader = `
  ${attributes}
  ${uniforms}

  varying vec3 vColor;

  ${curlNoise}

  float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
  }

  vec3 applyPhysics(vec3 newPosition, vec3 acc){
    float speed = u_speed*u_time;
    newPosition.x += u_noise_x*sin(speed*u_amplitude_x + u_speed*u_time);
    newPosition.y += u_noise_y*sin(speed*u_amplitude_y + u_speed*u_time);
    newPosition.z += u_noise_z*sin(speed*u_amplitude_z + u_speed*u_time);
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

  vec3 applyPerlinNoise(vec3 newPosition, float time, float u_amplitude_x, float u_amplitude_y, float u_amplitude_z){
    if(u_amplitude_x > 0.0){
      newPosition.x *= snoise(newPosition.xyz*u_amplitude_x + time);
    }
    if(u_amplitude_y > 0.0){
      newPosition.y *= snoise(newPosition.xyz*u_amplitude_y + time);
    }
    if(u_amplitude_z > 0.0){
      newPosition.z *= snoise(newPosition.xyz*u_amplitude_z + time);
    }
    return newPosition;
  }

  vec3 applySinCos1(vec3 newPosition){
    newPosition.x += sin(u_noise_x * newPosition.x - u_amplitude_x*u_time*u_speed);
    newPosition.y += cos(u_noise_y * newPosition.y - u_amplitude_y*u_time*u_speed);
    return newPosition;
  }

  vec3 applySinCos2(vec3 newPosition){
    newPosition.x += sin(u_noise_x * newPosition.y + u_amplitude_x*u_time);
    newPosition.x += cos(u_noise_y * newPosition.x + u_amplitude_y*u_time);
    return newPosition;
  }
    
  void main() {
    vColor = color;
    vec3 vertexPosition = position;
    vec3 acc = acceleration;

    float sound = u_sound * u_sound_intensity;

    float time = u_time * u_speed;

    // apply position effects
    vertexPosition.xyz = applyPhysics(vertexPosition, acc);
    vertexPosition.xyz = applyOffset(vertexPosition, sound, 1.0);


    // position points
    vec4 mvPosition = modelViewMatrix * vec4(vertexPosition, 1.0);

    // apply size capabilities
    gl_PointSize = u_size * size;

    gl_Position = projectionMatrix * mvPosition;
  }
`;

export { vertexShader };
