import { RigidBody } from '@react-three/rapier'
import { ParticlesCursor } from './models/ParticleCursor'
import { ClockPoint } from './models/ClockPoint'
import { TeaCup } from './models/TeaCup'
import { Door } from './models/Door'
import { BallBoard } from './models/BoardBall'
import { Sea } from './models/Sea'
import { Fireworks } from './models/Fireworks'
import { glassMaterial } from '@/assets/materials'
import { structModel as model } from '@/assets/model'

function StructModel() {
  const { clockPoint, teaCup, ballParent, wallgrass, clockGlass } = model.nodes
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
      <Fireworks />
      <Sea />
    </>
  )
}


export {
  StructModel
}