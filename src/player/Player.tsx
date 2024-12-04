
import { RigidBody, RapierRigidBody, useRapier, CapsuleCollider } from '@react-three/rapier'
import { useRef, useMemo, RefObject, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useOperater } from '@/hooks/useOperater'
import { getForwardDirection, getRightDirction } from '@/utils'
const speedScale = 5

const nextTranstion = new THREE.Vector3()
// 跳跃时间
let jumpTime = 0

let isFallingFromStairs = false
// 掉落时间， 如楼梯上掉下来
let isJumping = false
let fallingTime = 0


function useCharactorControll(rigidBody: RefObject<RapierRigidBody>) {
  const { rapier, world } = useRapier()

  const camera = useThree(state => state.camera)
  const [forward, back, left, right, jump] = useOperater()
  const characterController = useMemo(() => {
    const offset = 0.01
    const characterController = world.createCharacterController(offset);
    characterController.enableAutostep(0.6, 0.2, false);
    characterController.enableSnapToGround(0.6);
    return characterController
  }, [])

  function move(desiredTranslation: any) {
    characterController.computeColliderMovement(
      rigidBody.current!.collider(0),    // The collider we would like to move.
      desiredTranslation, // The movement we would like to apply if there wasn’t any obstacle.
    );

    const currentMovement = new THREE.Vector3()
    currentMovement.copy(rigidBody.current!.translation());

    // Read the result.
    const correctedMovement = characterController.computedMovement();
    currentMovement.add(correctedMovement);

    rigidBody.current!.setNextKinematicTranslation(currentMovement)
  }

  function getYTransition(v: number, time: number) {
    return v * time + time * time * -9.81 / 2 - nextTranstion.y
  }


  function checkIsFallFromStairs() {
    if (!rigidBody.current) {
      return
    }
    const origin = rigidBody.current.translation()
    origin.y -= 0.5
    const ray = new rapier.Ray(origin, { x: 0, y: -1, z: 0 })
    const hit = world.castRay(ray, 10, true, 2);
    if (!hit) {
      return
    }
    return hit.timeOfImpact > 0.2
  }

  useFrame((_, delta) => {
    if (!rigidBody.current) {
      return
    }
    const isOnGround = characterController.computedGrounded()
    if (!isJumping && !isFallingFromStairs) {
      const isFallFromStairs = checkIsFallFromStairs()
      if (isFallFromStairs) {
        fallingTime = 0
        isFallingFromStairs = true
      }
    }

    if (isOnGround) {
      isFallingFromStairs = false
      isJumping = false
    } else {
      fallingTime += delta
      jumpTime += delta
    }
    const forwordStrength = +forward - +back
    const rightStrength = +right - +left

    nextTranstion.copy(
      getForwardDirection(camera, forwordStrength * speedScale)
    )
    nextTranstion.add(getRightDirction(camera, rightStrength * speedScale))

    if (jump && !isJumping) {
      jumpTime = 0
      isJumping = true
    }
    nextTranstion.multiplyScalar(delta)
    if (isJumping) {
      nextTranstion.y += getYTransition(2.5, jumpTime)
    }

    if (isFallingFromStairs) {
      nextTranstion.y += getYTransition(0, fallingTime)
    }
    move(nextTranstion)
  })

  return {
    move,
    characterController
  }
}

function useCameraPositionUpdate(rigidBody: RefObject<RapierRigidBody>) {
  const camera = useThree(state => state.camera)
  useEffect(() => {
    if (!rigidBody.current) {
      return
    }
    setCamera(true, camera)
    camera.lookAt(new THREE.Vector3(2.8, 1.7, -3.5))
  }, [])
  function getPlayerHeadPosition() {
    const bodyPosition = rigidBody.current!.translation()
    const headPosition = new THREE.Vector3()
    headPosition.copy(bodyPosition)
    headPosition.y += 0.5
    return headPosition
  }
  function setCamera(isMove: boolean, camera: THREE.Camera) {
    if (!isMove) {
      return
    }
    const headPosition = getPlayerHeadPosition()
    camera.position.copy(headPosition)
  }
  const [forward, back, left, right, jump] = useOperater()
  useFrame((state) => {
    const isMove = forward || back || left || right || jump || isJumping || isFallingFromStairs
    setCamera(isMove, state.camera)
  })
}
function Player() {
  const rigidBodyRef = useRef<RapierRigidBody>(null)
  useCharactorControll(rigidBodyRef)
  useCameraPositionUpdate(rigidBodyRef)
  return (
    <>
      <axesHelper args={[10]} />
      <RigidBody colliders={false} type="kinematicPosition" restitution={0} friction={0} ref={rigidBodyRef} position={[0, 0.5, -1]} >
        <CapsuleCollider args={[0.5, 0.15]} />
      </RigidBody>
    </>

  )
}

export {
  Player
}