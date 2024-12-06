import * as THREE from 'three'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
const rgbeLoader = new RGBELoader()
const textureLoader = new THREE.TextureLoader()

let dayTexture: THREE.DataTexture
let nightTexture: THREE.DataTexture

const particleCursorTexture = textureLoader.load('./timo.jpeg')
const perlin2dImg = textureLoader.load('./perlin.png')
perlin2dImg.wrapS = THREE.RepeatWrapping
perlin2dImg.wrapT = THREE.RepeatWrapping
// perlin2dImg.repeat()


/** door */
const doorArmTexure = textureLoader.load('./textures/door/wooden_garage_door_arm_1k.jpg')
doorArmTexure.minFilter = THREE.NearestFilter
doorArmTexure.generateMipmaps = false
const doorNormalTexture = textureLoader.load('./textures/door/wooden_garage_door_nor_gl_1k.jpg')
doorNormalTexture.minFilter = THREE.NearestFilter
doorNormalTexture.generateMipmaps = false

const waterNormalMap0 = textureLoader.load('./textures/water/Water_1_M_Normal.jpg')
waterNormalMap0.wrapS = THREE.RepeatWrapping
waterNormalMap0.wrapT = THREE.RepeatWrapping
waterNormalMap0.generateMipmaps = false
waterNormalMap0.repeat.set(10, 10)

const waterNormalMap1 = textureLoader.load('./textures/water/Water_2_M_Normal.jpg')
waterNormalMap1.wrapS = THREE.RepeatWrapping
waterNormalMap1.wrapT = THREE.RepeatWrapping
waterNormalMap1.generateMipmaps = false
waterNormalMap1.repeat.set(10, 10)

// environment texture
rgbeLoader.load('./environment.hdr', texture => {
  texture.mapping = THREE.EquirectangularReflectionMapping
  dayTexture = texture
})
rgbeLoader.load('./environment1.hdr', texture => {
  texture.mapping = THREE.EquirectangularReflectionMapping
  nightTexture = texture
})

export {
  particleCursorTexture,
  perlin2dImg,
  doorArmTexure,
  doorNormalTexture,
  waterNormalMap0,
  waterNormalMap1,
  dayTexture,
  nightTexture
}