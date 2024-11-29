uniform sampler2D uPictureTexture;
uniform sampler2D uDisplacementTexture;
uniform vec2 uResolution;
varying vec3 vColor;
attribute float aIntensity;
attribute float aAngle;

void main() {

    vec3 newPosition = position;
    float displacementIntensity = texture(uDisplacementTexture, uv).r;
    displacementIntensity = smoothstep(0.1, 0.3, displacementIntensity);

    vec3 displacement = vec3(cos(aAngle) * 0.2, sin(aAngle) * 0.2, .1);
    displacement *= displacementIntensity;
    displacement *= 3.;
    displacement *= aIntensity;
    newPosition += displacement;
    vec3 picColor = texture2D(uPictureTexture, uv).rgb;
    float pictureIntensity = picColor.r * 0.299 + picColor.g * 0.587 + picColor.b * 0.114;
    // Final position
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // Picture
    // Point size
    gl_PointSize = 0.04 * pictureIntensity * uResolution.y;
    gl_PointSize *= (1.0 / -viewPosition.z);

    // Varyings
    vColor = picColor;

}