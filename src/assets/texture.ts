import * as THREE from 'three'

const textureLoader = new THREE.TextureLoader()
const particleCursorTexture = textureLoader.load('./timo.jpeg')
const perlin2dImg = textureLoader.load('./perlin.png')
perlin2dImg.wrapS = THREE.RepeatWrapping
perlin2dImg.wrapT = THREE.RepeatWrapping
// perlin2dImg.repeat()


/** door */
const doorArmTexure = textureLoader.load('/public/textures/door/wooden_garage_door_arm_1k.jpg')
doorArmTexure.minFilter = THREE.NearestFilter
doorArmTexure.generateMipmaps = false
const doorNormalTexture = textureLoader.load('/public/textures/door/wooden_garage_door_nor_gl_1k.jpg')
doorArmTexure.minFilter = THREE.NearestFilter
doorArmTexure.generateMipmaps = false


export {
  particleCursorTexture,
  perlin2dImg,
  doorArmTexure,
  doorNormalTexture
}