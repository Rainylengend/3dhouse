import { useThree } from '@react-three/fiber'
import { Lights } from './Light'
import { StructModel } from './StructModel'
import { Physics } from '@react-three/rapier'
import { Perf } from 'r3f-perf'
import { Player } from './player/Player'
import { useEffect } from 'react'
import * as THREE from 'three'
import { glassMaterial, basicMaterial } from '@/assets/materials'

function Experience() {

  return (
    <>
      <Perf position='top-left' />
      <Lights />
      <Physics  >
        <StructModel />
        <Player />
      </Physics>
    </>
  )
}

export {
  Experience
}