import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { RigidBody, RapierRigidBody, CuboidCollider } from '@react-three/rapier'
import { ThreeEvent, useThree } from '@react-three/fiber'
import { getForwardDirection } from '@/utils'

type Props = {
  obj3d: THREE.Object3D
}
function BallBoard({ obj3d }: Props) {
  const children = useMemo(() => {
    const board: THREE.Object3D[] = []
    const ball: THREE.Object3D[] = []
    let boardplane: THREE.Object3D | undefined
    obj3d.children.forEach(child => {
      if (child.name === 'boardplane') {
        boardplane = child
      }
      else if (child.name.includes('ball')) {
        ball.push(child)
      } else {
        board.push(child)
      }
    })
    return {
      ball,
      board,
      boardplane
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
    const strength = 0.001
    const direction = getForwardDirection(camera, strength)
    direction.y = 0
    targetBallRigdbody.applyImpulse(direction, true)

    e.stopPropagation()
  }


  return (
    <>
      <RigidBody friction={1} type="fixed" colliders="trimesh" position={obj3d.position} rotation={obj3d.rotation}>
        {children.board.map(item => {
          return (
            <primitive object={item} key={item.name} />
          )
        })}
      </RigidBody>
      <RigidBody friction={1} type="fixed" position={obj3d.position} rotation={obj3d.rotation}>
        <primitive object={children.boardplane!} />
      </RigidBody>
      {children.ball.map(item => {
        return (
          <RigidBody ref={v => setRef(v!, item.name)} type="dynamic" colliders="ball" position={obj3d.position} rotation={obj3d.rotation} key={item.name} >
            <primitive object={item} onClick={onBallClick} />
          </RigidBody>
        )
      })}
    </>
  )
}

export {
  BallBoard
}