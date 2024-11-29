import * as THREE from 'three'
import waterSmokefragmentShader from '@/shaders/waterSmoke/fragment.glsl?raw'
import waterSmokevertexShader from '@/shaders/waterSmoke/vertex.glsl?raw'
import { perlin2dImg } from '@/assets/texture'

const basicMaterial = new THREE.MeshBasicMaterial({
  color: 'white'
})


// const glassMaterial = new THREE.MeshPhysicalMaterial({
//   transmission: 1,
//   ior: 1.517,
//   roughness: 0.1,
//   color: 'orange'
// })
const glassMaterial = new THREE.MeshBasicMaterial({
  color: 'white'
})

const waterSmokeMaterial = new THREE.ShaderMaterial(
  {
    vertexShader: waterSmokevertexShader,
    fragmentShader: waterSmokefragmentShader,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: new THREE.Uniform(0),
      uPerlinTexture: new THREE.Uniform(perlin2dImg),
    }
  }
)


export {
  glassMaterial,
  basicMaterial,
  waterSmokeMaterial
}