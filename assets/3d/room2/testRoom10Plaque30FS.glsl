precision highp float;
varying vec3 v_normal;
varying vec2 v_texcoord0;
uniform lowp sampler2D u_diffuse;
uniform lowp vec4 u_filterColor;
uniform lowp float u_transparency;
void main(void) {
lowp vec4 diffuse = texture2D(u_diffuse, v_texcoord0);
if (diffuse.a <0.001) 
	discard;
lowp vec4 color = vec4(0., 0., 0., 0.);
diffuse *= u_filterColor;

color.xyz += diffuse.xyz;
gl_FragColor = vec4(color.rgb * diffuse.a, diffuse.a * u_transparency);
}
