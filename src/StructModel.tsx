import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { ParticlesCursor } from './models/ParticleCursor'
import { ClockPoint } from './models/ClockPoint'
import { TeaCup } from './models/TeaCup'
import { Door } from './models/Door'
import { BallBoard } from './models/BoardBall'
import { Sea } from './models/Sea'
import { glassMaterial } from '@/assets/materials'

function StructModel() {
  const model = useGLTF('/myexperience.glb')
  const { clockPoint, teaCup, ballParent, wallgrass, clockGlass } = model.nodes
  console.log(model.nodes);

  return (
    <>
      <RigidBody restitution={0} friction={10} type="fixed" colliders="trimesh">
        <primitive object={model.scene} />
      </RigidBody>
      <ParticlesCursor />
      <ClockPoint obj3d={clockPoint} />
      <TeaCup obj3d={teaCup} />
      <Door />
      <BallBoard obj3d={ballParent} />
      <RigidBody restitution={0} friction={10} type="fixed">
        <primitive object={wallgrass} material={glassMaterial} />
      </RigidBody>
      <primitive object={clockGlass} material={glassMaterial} />
      <Sea />
    </>
  )
}


export {
  StructModel
}