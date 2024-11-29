import * as THREE from 'three'

const waterSmokeGeometry = new THREE.PlaneGeometry(1, 1, 16, 16)
waterSmokeGeometry.translate(0, 0.5, 0)
waterSmokeGeometry.scale(0.1, 0.5, 1)

export {
  waterSmokeGeometry
}