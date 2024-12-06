import * as THREE from 'three'
import { GLTFLoader, GLTF } from 'three/addons/loaders/GLTFLoader.js'

const gltfLoader = new GLTFLoader()

type Nodes = {
  [key: string]: THREE.Object3D | THREE.Mesh | THREE.Group
}
let structModel: GLTF & {
  nodes: Nodes
}
function loadModel() {
  gltfLoader.load('./myexperience.glb', gltf => {
    structModel = gltf as any
    const nodes: Nodes = {}
    gltf.scene.children.forEach(item => {
      nodes[item.name] = item
    })
    structModel.nodes = nodes
  })
}
export {
  loadModel,
  structModel
}
