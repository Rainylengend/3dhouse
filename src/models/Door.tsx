import * as THREE from 'three'
import { useRef } from 'react'
import { doorMaterial, basicDoorMateria } from '@/assets/materials'
import { RigidBody, CuboidCollider, RapierRigidBody } from '@react-three/rapier'
import gsap from 'gsap'


const doorGeometry = new THREE.BoxGeometry(1, 1, 0.2)
const materials = [basicDoorMateria, basicDoorMateria, basicDoorMateria, basicDoorMateria, doorMaterial, doorMaterial]

let isOpen = false
function Door() {
  const doorRigidBody = useRef<RapierRigidBody>(null)
  function onPointerDown() {
    const euler = new THREE.Euler()
    const quaternion = new THREE.Quaternion()
    const target = { angle: isOpen ? -Math.PI / 2 : 0 }
    gsap.to(target, {
      angle: isOpen ? 0 : -Math.PI / 2,
      onUpdate() {
        euler.set(0, target.angle, 0)
        quaternion.setFromEuler(euler)
        doorRigidBody.current!.setNextKinematicRotation(quaternion)
      }
    })
    isOpen = !isOpen
  }
  return (
    <>
      <RigidBody position={[1.6 + 0.85, 1.5, -3.2]} ref={doorRigidBody} type="kinematicPosition" colliders={false} >
        <CuboidCollider args={[0.85, 1.5, 0.1]} position={[-0.85, 0, 0]} />
        <mesh geometry={doorGeometry} material={materials} onPointerUp={onPointerDown} position-x={-0.85} scale={[1.7, 3, 1]} />
      </RigidBody>ss
    </>
  )
}

export {
  Door
}