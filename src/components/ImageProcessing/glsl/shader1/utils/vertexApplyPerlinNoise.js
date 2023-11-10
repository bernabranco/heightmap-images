export const applyPerlinNoise = `
vec3 applyPerlinNoise(vec3 newPosition){
    float velocity = u_time*u_speed;

    vec3 pointX = newPosition.xyz*u_amplitude_x;
    newPosition.x += snoise(pointX + velocity)*u_noise_x;
  
    vec3 pointY = newPosition.xyz*u_amplitude_y;
    newPosition.y += snoise(pointY + velocity)*u_noise_y;
  
    vec3 pointZ = newPosition.xyz*u_amplitude_z;
    newPosition.z += snoise(pointZ + velocity)*u_noise_z;
    
    return newPosition;
  }
`;
