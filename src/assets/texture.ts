import * as THREE from 'three'

const textureLoader = new THREE.TextureLoader()
const particleCursorTexture = textureLoader.load('./timo.jpeg')
const perlin2dImg = textureLoader.load('./perlin.png')
perlin2dImg.wrapS = THREE.RepeatWrapping
perlin2dImg.wrapT = THREE.RepeatWrapping
// perlin2dImg.repeat()
export {
  particleCursorTexture,
  perlin2dImg
}