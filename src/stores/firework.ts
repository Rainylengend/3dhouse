import { Vector3 } from 'three'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

type State = {
  fireworkIsPlaying: boolean
  cameraPosition: Vector3
  changeState: (v: boolean) => void
  updateCameraPosition: (v: Vector3) => void
}

const useFirework = create(
  subscribeWithSelector<State>(
    (set) => ({
      cameraPosition: new Vector3(),
      fireworkIsPlaying: false,
      changeState: (v) => set(() => ({
        fireworkIsPlaying: v
      })),
      updateCameraPosition: v => set(() => ({
        cameraPosition: v
      }))
    })
  )
)


export {
  useFirework
}