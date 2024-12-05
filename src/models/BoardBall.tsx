import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { RigidBody, RapierRigidBody } from '@react-three/rapier'
import { ThreeEvent, useThree } from '@react-three/fiber'
import { getForwardDirection } from '@/utils'

type Props = {
  obj3d: THREE.Object3D
}
function BallBoard({ obj3d }: Props) {
  const ball = useMemo(() => {
    if (!obj3d.children.length) {
      return null
    }
    const firstGeometry = (obj3d.children[0] as THREE.Mesh).geometry
    return obj3d.children.map((child) => {
      const c = child as THREE.Mesh
      (c.material as THREE.MeshStandardMaterial).flatShading = true
      c.geometry = firstGeometry
      const postion = child.position
      postion.add(obj3d.position)
      const rigidBodyPosition = new THREE.Vector3(postion.x, postion.y, postion.z)
      postion.set(0, 0, 0)
      return (
        <RigidBody type="dynamic" position={rigidBodyPosition} restitution={0.2} friction={1} ref={v => setRef(v!, c.name)} colliders="ball" key={c.name}>
          <primitive object={c} onClick={onBallClick} />
        </RigidBody>
      )
    })
  }, [obj3d])

  const ballRigdbody = useRef<{ [index: string]: RapierRigidBody }>({})
  const camera = useThree(state => state.camera)

  function setRef(v: RapierRigidBody, name: string) {
    ballRigdbody.current[name] = v
  }
  function onBallClick(e: ThreeEvent<MouseEvent>) {

    const name = e.eventObject.name
    const targetBallRigdbody = ballRigdbody.current[name]
    if (!targetBallRigdbody) {
      return
    }
    const strength = 0.0015
    const direction = getForwardDirection(camera, strength)
    direction.y = 0
    targetBallRigdbody.applyImpulse(direction, true)
    e.stopPropagation()
  }


  return ball
}

export {
  BallBoard
}