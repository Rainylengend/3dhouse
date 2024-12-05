import { Canvas } from '@react-three/fiber'
import { Experience } from './Experience'
import { KeyboardControls } from '@react-three/drei'
import type { KeyboardControlsEntry } from '@react-three/drei'
import { useMemo } from 'react'
import { Controls } from './const/index'
import { Entry } from '@/Html/Entry'

function App() {
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(() => [
    { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
    { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
    { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
    { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
    { name: Controls.jump, keys: ['Space'] },
  ], [])


  return (
    <>
      <KeyboardControls map={map}>
        <Canvas camera={{ position: [0, 1, -1], fov: 45, near: .01, far: 300 }}>
          <Experience />
        </Canvas>
        <Entry />
      </KeyboardControls >

    </>
  )

}

export default App
