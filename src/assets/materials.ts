import * as THREE from 'three'
import waterSmokefragmentShader from '@/shaders/waterSmoke/fragment.glsl?raw'
import waterSmokevertexShader from '@/shaders/waterSmoke/vertex.glsl?raw'
import {
  perlin2dImg,
  doorArmTexure,
  doorNormalTexture,
  loadTexture
} from '@/assets/texture'

loadTexture()
const basicMaterial = new THREE.MeshBasicMaterial({
  color: 'white'
})


// const glassMaterial = new THREE.MeshPhysicalMaterial({
//   transmission: 1,
//   ior: 1.517,
//   roughness: 0.1,
//   color: '#eeefff'
// })
const glassMaterial = new THREE.MeshBasicMaterial({
  color: 'white',
  opacity: 0.4,
  transparent: true
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

/**
 * 
 * 
 */
const doorMaterial = new THREE.MeshStandardMaterial({
  aoMap: doorArmTexure,
  metalness: 1,
  metalnessMap: doorArmTexure,
  roughnessMap: doorArmTexure,
  normalMap: doorNormalTexture,
  side: THREE.DoubleSide,
  displacementScale: 0.1,
  displacementBias: -0.05,
  color: '#489CFA'
})

const basicDoorMateria = new THREE.MeshBasicMaterial({
  color: '#489CFA'
})

export {
  glassMaterial,
  basicMaterial,
  waterSmokeMaterial,
  doorMaterial,
  basicDoorMateria
}