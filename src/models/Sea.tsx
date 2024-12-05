import { Water } from 'three/examples/jsm/objects/Water2.js';
import * as THREE from 'three'
import { waterNormalMap0, waterNormalMap1 } from '@/assets/texture'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
const waterGeometry = new THREE.PlaneGeometry(1000, 1000);

const water = new Water(waterGeometry, {
  color: '#eeeeff',
  scale: 200,
  flowDirection: new THREE.Vector2(1, 1),
  textureWidth: 512,
  textureHeight: 512,
  normalMap0: waterNormalMap0,
  normalMap1: waterNormalMap1,
});


function Sea() {


  return (
    <>
      <primitive object={water} position={[0, 4, 0]} rotation-x={-Math.PI / 2} />
      <RigidBody type='fixed' colliders={false} position={[0, 3.6, 0]}>

        {/* floor 空气海平面地板 */}
        <CuboidCollider args={[23.3, 0.2, 10]} position={[-26.7, 0, -10]} />
        <CuboidCollider args={[23.3, 0.2, 10]} position={[26.7, 0, -10]} />
        <CuboidCollider args={[50, 0.2, 25]} position={[0, 0, 25]} />
        <CuboidCollider args={[50, 0.2, 15]} position={[0, 0, -35]} />

        {/* wall 空气墙 */}
        <CuboidCollider args={[50, 10, 1]} position={[0, 10, -51]} />
        <CuboidCollider args={[50, 10, 1]} position={[0, 10, 51]} />
        <CuboidCollider args={[1, 10, 50]} position={[51, 10, 0]} />
        <CuboidCollider args={[1, 10, 50]} position={[-51, 10, 0]} />
      </RigidBody>
    </>
  )
}


export {
  Sea
}