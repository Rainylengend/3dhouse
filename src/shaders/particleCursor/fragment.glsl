varying vec3 vColor;
void main() {
    vec2 uv = gl_PointCoord;
    float distanceToCenter = distance(uv, vec2(0.5));
    gl_FragColor = vec4(vColor, 1.0);

    if(distanceToCenter > 0.5)
        discard;

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}