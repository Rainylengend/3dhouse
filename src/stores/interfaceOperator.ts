import { create } from 'zustand'
import { Controls } from '@/const'

type State = Record<Controls, boolean> & {
  changeKeyResponse: (key: Controls, v: boolean) => void
}

const useInterfaceOperator = create<State>((set) => ({
  [Controls.jump]: false,
  [Controls.left]: false,
  [Controls.right]: false,
  [Controls.forward]: false,
  [Controls.back]: false,
  changeKeyResponse: (key, v) => set(() => ({
    [key]: v
  }))
}))


export {
  useInterfaceOperator
}