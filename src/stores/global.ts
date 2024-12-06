import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

type State = {
  isReady: boolean
  changeState: (v: boolean) => void
}

const useGlobal = create(
  subscribeWithSelector<State>(
    (set) => ({
      isReady: false,
      changeState: (v) => set(() => ({
        isReady: v
      }))
    })
  )
)


export {
  useGlobal
}