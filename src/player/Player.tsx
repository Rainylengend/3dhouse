
import { RigidBody, RapierRigidBody, useRapier, CapsuleCollider } from '@react-three/rapier'
import { useRef, useMemo, RefObject, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useOperater } from '@/hooks/useOperater'
import { useFirework } from '@/stores/firework'
import { getForwardDirection, getRightDirection } from '@/utils'

new THREE.CylinderGeometry
const nextTransition = new THREE.Vector3()

// 掉落速度
let currentFallingSpeed: number | null = null


let newDelta: number = 0
function useCharacterController(rigidBody: RefObject<RapierRigidBody>) {
  const { rapier, world } = useRapier()

  const camera = useThree(state => state.camera)
  const controllerDirection = useOperater()
  const characterController = useMemo(() => {
    const offset = 0.01
    const characterController = world.createCharacterController(offset);
    characterController.enableAutostep(0.5, 0.4, false);
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


  function checkUpAndDown(isUp: boolean) {
    const origin = rigidBody.current!.translation()
    const offset = isUp ? 0.606 : -0.606
    origin.y += offset
    const ray = new rapier.Ray(origin, { x: 0, y: isUp ? 1 : -1, z: 0 })
    const hit = world.castRay(ray, 10000, true, 2);
    return (hit?.timeOfImpact || 0) < 0.06
  }

  useFrame((_, delta) => {
    if (!rigidBody.current) {
      return
    }
    if (newDelta < 0.014) {
      newDelta += delta
      return
    }
    const isOnGround = checkUpAndDown(false)

    // 设置从空中落下的速度和时间
    if (currentFallingSpeed === null) {
      // const isUp = checkUpAndDown(true)
      if (!isOnGround) {
        currentFallingSpeed = 0
      }

    }
    if (isOnGround) {
      currentFallingSpeed = null
    }

    // 设置跳跃的速度和时间
    if (controllerDirection.y && currentFallingSpeed === null) {
      currentFallingSpeed = 6
    }

    const forwardStrength = controllerDirection.z
    const rightStrength = controllerDirection.x


    // 期望走多少米
    const meters = 6
    const forwardDirection = getForwardDirection(camera, forwardStrength)
    const rightDirection = getRightDirection(camera, rightStrength)
    nextTransition.copy(forwardDirection).add(rightDirection).normalize()
    nextTransition.multiplyScalar(meters * newDelta)

    if (currentFallingSpeed !== null) {
      currentFallingSpeed -= 9.81 * newDelta
      nextTransition.y += currentFallingSpeed * newDelta
    }
    newDelta = 0
    if (nextTransition.length() === 0) {
      return
    }
    move(nextTransition)
  })

  return {
    move,
    characterController
  }
}

function useCameraPositionUpdate(rigidBody: RefObject<RapierRigidBody>) {
  const camera = useThree(state => state.camera)
  const updateCameraPosition = useFirework(state => state.updateCameraPosition)
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
    updateCameraPosition(headPosition)
  }
  const controllerDirection = useOperater()
  useFrame((state) => {
    const isMove = controllerDirection.length() > 0 || currentFallingSpeed !== null
    setCamera(isMove, state.camera)
  })
}
function Player() {
  const rigidBodyRef = useRef<RapierRigidBody>(null)
  useCharacterController(rigidBodyRef)
  useCameraPositionUpdate(rigidBodyRef)
  return (
    <>
      {/* CapsuleCollider 胶囊上下两部分圆头搞0.105左右 */}
      <RigidBody colliders={false} type="kinematicPosition" restitution={0} friction={1} ref={rigidBodyRef} position={[0, 2.05, -4]} >
        <CapsuleCollider args={[0.5, 0.15]} />
      </RigidBody>
    </>

  )
}

export {
  Player
}