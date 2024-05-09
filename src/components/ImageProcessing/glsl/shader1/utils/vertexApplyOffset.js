export const applyOffset = `
vec3 applyOffset(vec3 newPosition, float time, float sound){
    newPosition.x *= u_offset_x + sound;
    newPosition.y *= u_offset_y + sound;
    newPosition.z *= u_offset_z + sound;

    return newPosition;
  }
`;
