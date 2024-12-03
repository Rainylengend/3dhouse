import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { RigidBody, RapierRigidBody } from '@react-three/rapier'
import { ThreeEvent, useThree } from '@react-three/fiber'
import { getForwardDirection } from '@/utils'

type Props = {
  obj3d: THREE.Object3D
}
function BallBoard({ obj3d }: Props) {
  const children = useMemo(() => {
    const board: THREE.Object3D[] = []
    const ball: { mesh: THREE.Mesh, rigidBodyPosition: THREE.Vector3 }[] = []
    obj3d.children.forEach((child) => {
      const c = child as THREE.Mesh
      if (child.name.includes('ball')) {
        (c.material as THREE.MeshStandardMaterial).flatShading = true

        c.geometry = ball[0]?.mesh.geometry || c.geometry
        const postion = child.position
        postion.add(obj3d.position)
        ball.push({
          rigidBodyPosition: new THREE.Vector3(postion.x, postion.y, postion.z),
          mesh: c
        })
        postion.set(0, 0, 0)

      } else {
        board.push(child)
      }
    })
    return {
      ball,
      board
    }
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


  return (
    <>
      <RigidBody position={obj3d.position} restitution={0.2} friction={1} type="fixed" colliders="trimesh">
        {children.board.map(item => {
          return (
            <primitive object={item} key={item.name} />
          )
        })}
      </RigidBody>
      {children.ball.map(item => {
        return (
          <RigidBody type="dynamic" position={item.rigidBodyPosition} restitution={0.2} friction={1} ref={v => setRef(v!, item.mesh.name)} colliders="ball" key={item.mesh.name}>
            <primitive object={item.mesh} onClick={onBallClick} position={[0, 0, 0]} />
          </RigidBody>
        )
      })}
    </>
  )
}

export {
  BallBoard
}