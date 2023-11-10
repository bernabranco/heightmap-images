export const applyOffset = `
vec3 applyOffset(vec3 newPosition, float time, float sound){
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
`;
