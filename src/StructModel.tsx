import { useGLTF } from '@react-three/drei'
import { RigidBody, MeshCollider } from '@react-three/rapier'
import { Water } from 'three/examples/jsm/objects/Water'
import { glassMaterial, basicMaterial } from '@/assets/materials'
import { useMemo } from 'react'
import { ParticlesCursor } from './models/ParticleCursor'
import { ClockPoint } from './models/ClockPoint'
import { TeaCup } from './models/TeaCup'
import { Door } from './models/Door'
import { BallBoard } from './models/BoardBall'

function StructModel() {
  const model = useGLTF('/myexperience.glb')
  const { clockPoint, teaCup, ballBoard } = model.nodes
  console.log(model.nodes);

  return (
    <>
      {/* <RigidBody restitution={0} friction={10} type="fixed" colliders="trimesh">
        <primitive object={model.scene} />
      </RigidBody>
      <ParticlesCursor />
      <ClockPoint obj3d={clockPoint} />
      <TeaCup obj3d={teaCup} />
      <Door /> */}
      <BallBoard obj3d={ballBoard} />
    </>
  )
}


export {
  StructModel
}