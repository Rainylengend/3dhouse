import { Environment } from '@react-three/drei'
function Lights() {
  return (
    <>
      <ambientLight args={['#fff', 1]} />
      <Environment files={'/environment.hdr'} background backgroundBlurriness={0} />
    </>
  )
}

export {
  Lights
}