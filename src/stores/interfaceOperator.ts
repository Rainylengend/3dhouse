import { create } from 'zustand'
import { Vector2 } from 'three'


type State = {
  direction: Vector2,
  jump: boolean
  changeDirection: (v: Vector2) => void
  changeJump: (v: boolean) => void
}

const useInterfaceOperator = create<State>((set) => ({
  direction: new Vector2(),
  jump: false,
  changeDirection: (v) => set(() => ({
    direction: v
  })),
  changeJump: (v) => set(() => ({
    jump: v
  }))
}))


export {
  useInterfaceOperator
}