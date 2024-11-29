import * as THREE from 'three'
import { useEffect, useMemo } from 'react'
import { waterSmokeGeometry } from '@/assets/geometry'
import { waterSmokeMaterial } from '@/assets/materials'
import { useFrame } from '@react-three/fiber'

type Props = {
  obj3d: THREE.Object3D
}


function createWaterMesh() {
  const waterMesh = new THREE.Mesh(
    waterSmokeGeometry,
    waterSmokeMaterial
  )
  waterMesh.rotateY(-Math.PI / 2)
  return waterMesh
}

function TeaCup({ obj3d }: Props) {
  const renderMesh = useMemo(() => createWaterMesh(), [])
  useEffect(() => {
    obj3d.add(renderMesh)
    return () => {
      obj3d.remove(renderMesh)
    }
  }, [])
  useFrame(({ clock }) => {
    waterSmokeMaterial.uniforms.uTime.value = clock.getElapsedTime()
  })
  return (
    <>
      <primitive object={obj3d} />
    </>
  )
}

export {
  TeaCup
}