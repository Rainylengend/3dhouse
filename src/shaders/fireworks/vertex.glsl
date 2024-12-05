uniform float uProgress;
uniform float uSize;
uniform vec2 uResolution;

attribute float aSize;
attribute float aTimeMultiplier;

float remap(float value, float originMin, float originMax, float destinationMin, float destinationMax) {
    return destinationMin + (value - originMin) * (destinationMax - destinationMin) / (originMax - originMin);
}
void main() {
    float progress = aTimeMultiplier * uProgress;
    vec3 newPosition = position;
    float explodingProgress = remap(progress, 0.0, 0.1, 0.0, 1.0);
    explodingProgress = clamp(explodingProgress, 0., 1.);
    explodingProgress = 1. - pow((1. - explodingProgress), 3.0);
    newPosition *= explodingProgress;

  // Falling
    float fallingProgress = remap(progress, 0.1, 1.0, 0.0, 1.0);
    fallingProgress = clamp(fallingProgress, 0.0, 1.0);
    fallingProgress = 1.0 - pow(1.0 - fallingProgress, 3.0);
    newPosition.y -= fallingProgress * 0.2;

    // Scaling
    float sizeOpeningProgress = remap(progress, 0.0, 0.125, 0.0, 1.0);
    float sizeClosingProgress = remap(progress, 0.125, 1.0, 1.0, 0.0);
    float sizeProgress = min(sizeOpeningProgress, sizeClosingProgress);
    sizeProgress = clamp(sizeProgress, 0.0, 1.0);

    // Twinkling
    float twinklingProgress = remap(progress, 0.2, 0.8, 0.0, 1.0);
    twinklingProgress = clamp(twinklingProgress, 0.0, 1.0);
    float sizeTwinkling = sin(progress * 40.) * 0.5 + 0.5;
    sizeTwinkling = 1.0 - sizeTwinkling * twinklingProgress;

    vec4 viewPosition = viewMatrix * modelMatrix * vec4(newPosition, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = uResolution.y * uSize * sizeProgress * aSize * sizeTwinkling;
    gl_PointSize *= (1.0 / -viewPosition.z);
    if(gl_PointSize < 1.0)
        gl_Position = vec4(9999.9);
}