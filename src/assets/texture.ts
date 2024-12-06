import * as THREE from 'three'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

const textureLoader = new THREE.TextureLoader()
const rgbeLoader = new RGBELoader()

let particleCursorTexture: THREE.Texture
let perlin2dImg: THREE.Texture
let doorArmTexure: THREE.Texture
let doorNormalTexture: THREE.Texture
let waterNormalMap0: THREE.Texture
let waterNormalMap1: THREE.Texture
let dayTexture: THREE.DataTexture
let nightTexture: THREE.DataTexture

function loadTexture() {
  if (particleCursorTexture) {
    return
  }
  particleCursorTexture = textureLoader.load('./timo.jpeg')
  perlin2dImg = textureLoader.load('./perlin.png')
  perlin2dImg.wrapS = THREE.RepeatWrapping
  perlin2dImg.wrapT = THREE.RepeatWrapping
  // perlin2dImg.repeat()


  /** door */
  doorArmTexure = textureLoader.load('./textures/door/wooden_garage_door_arm_1k.jpg')
  doorArmTexure.minFilter = THREE.NearestFilter
  doorArmTexure.generateMipmaps = false
  doorNormalTexture = textureLoader.load('./textures/door/wooden_garage_door_nor_gl_1k.jpg')
  doorArmTexure.minFilter = THREE.NearestFilter
  doorArmTexure.generateMipmaps = false

  waterNormalMap0 = textureLoader.load('./textures/water/Water_1_M_Normal.jpg')
  waterNormalMap0.wrapS = THREE.RepeatWrapping
  waterNormalMap0.wrapT = THREE.RepeatWrapping
  waterNormalMap0.generateMipmaps = false
  waterNormalMap0.repeat.set(10, 10)

  waterNormalMap1 = textureLoader.load('./textures/water/Water_2_M_Normal.jpg')
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

}

export {
  particleCursorTexture,
  perlin2dImg,
  doorArmTexure,
  doorNormalTexture,
  waterNormalMap0,
  waterNormalMap1,
  loadTexture,
  dayTexture,
  nightTexture
}