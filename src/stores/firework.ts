import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

type State = {
  fireworkIsPlaying: boolean
  changeState: (v: boolean) => void
}

const useFirework = create(
  subscribeWithSelector<State>(
    (set) => ({
      fireworkIsPlaying: false,
      changeState: (v) => set(() => ({
        fireworkIsPlaying: v
      }))
    })
  )
)


export {
  useFirework
}