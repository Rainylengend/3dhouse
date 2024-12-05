import { useThree, useFrame } from '@react-three/fiber'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { useEffect, useRef } from 'react';
const rgbeLoader = new RGBELoader()
import * as THREE from 'three'
import { useFirework } from '@/stores/firework'


const environmentMaterial = new THREE.MeshBasicMaterial({
  side: THREE.BackSide
})

let dayTexture: THREE.DataTexture
let nightTexture: THREE.DataTexture

function Lights() {
  const { scene, camera } = useThree(state => {
    return {
      scene: state.scene,
      camera: state.camera
    }
  })
  function setTexture(texture: THREE.DataTexture) {
    environmentMaterial.map = texture
    environmentMaterial.needsUpdate = true
    scene.environment = texture
    scene.background = texture
  }
  useEffect(() => {
    rgbeLoader.load('./environment.hdr', texture => {
      texture.mapping = THREE.EquirectangularReflectionMapping
      dayTexture = texture
      setTexture(dayTexture)
    })
    rgbeLoader.load('./environment1.hdr', texture => {
      texture.mapping = THREE.EquirectangularReflectionMapping
      nightTexture = texture
    })
    const unsubscribeFirework = useFirework.subscribe(state => state.fireworkIsPlaying, v => {
      if (v) {
        setTexture(nightTexture)
      } else {
        setTexture(dayTexture)
      }
    })
    return function () {
      unsubscribeFirework()
    }
  }, [])

  useFrame(() => {
    mesh.current?.position.copy(camera.position)
  })
  const mesh = useRef<THREE.Mesh>(null)

  return (
    <>
      <mesh rotation={[0, -Math.PI / 2, 0]} visible={true} ref={mesh} material={environmentMaterial} >
        <sphereGeometry args={[30]} />
      </mesh>
      <ambientLight args={['#fff', 1]} />
    </>
  )
}

export {
  Lights
}