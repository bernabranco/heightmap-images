const fragmentShader = `
uniform sampler2D pointTexture;
varying vec3 vColor;
varying vec2 vUv;
uniform float u_time;
uniform float u_contrast;
uniform float u_vertex_red;
uniform float u_vertex_green;
uniform float u_vertex_blue;

void main() {
  vec2 uv = 1.0 - gl_PointCoord;
  vec3 color = vColor;

  //change color
  color *= u_contrast;
  color.r *= u_vertex_red;
  color.g *= u_vertex_green;
  color.b *= u_vertex_blue;
  
  // apply color to points
  gl_FragColor = vec4(color, 1.0 );

  // aplly texture to points
  gl_FragColor = gl_FragColor * texture2D(pointTexture, uv);
}
`;

export { fragmentShader };
