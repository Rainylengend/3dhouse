import { useThree, useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react';
import { dayTexture, nightTexture } from '@/assets/texture'

import * as THREE from 'three'
import { useFirework } from '@/stores/firework'


const environmentMaterial = new THREE.MeshBasicMaterial({
  side: THREE.BackSide
})


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
    setTexture(dayTexture)
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
      <ambientLight args={['#dff3a3', 0.6]} />
    </>
  )
}

export {
  Lights
}