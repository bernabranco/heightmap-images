export const applyPhysics = `
vec3 applyPhysics(vec3 newPosition, float time, vec3 acc){
    float speed = u_speed*u_time;

    newPosition.x += u_noise_x*sin(speed*u_amplitude_x + time);
    newPosition.y += u_noise_y*cos(speed*u_amplitude_y +  time);
    newPosition.z += u_noise_z*sin(speed*u_amplitude_z + time);

    return newPosition;
  }
`;
