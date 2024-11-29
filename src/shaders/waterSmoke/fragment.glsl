varying vec2 vUv;
uniform sampler2D uPerlinTexture;
uniform float uTime;
void main() {
    vec2 smokeUv = vUv;
    smokeUv.x *= 0.5;
    smokeUv.y *= 0.3;
    smokeUv.y -= uTime * 0.03;
    float smoke = texture2D(uPerlinTexture, smokeUv).r;
    smoke = smoothstep(0.3, 1.0, smoke);
    smoke *= smoothstep(0.0, 0.1, vUv.x);
    smoke *= smoothstep(1., .9, vUv.x);
    smoke *= smoothstep(0.0, 0.1, vUv.y);
    smoke *= smoothstep(1.0, 0.4, vUv.y);

    vec3 color = vec3(.8745, 0.9529, .6392);
    gl_FragColor = vec4(color, smoke);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}