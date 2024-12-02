import { useKeyboardControls } from "@react-three/drei"
import { Controls } from "@/const"
import { useMemo } from "react"
import { useInterfaceOperator } from '@/stores/interfaceOperator'

function useOperater() {
  const forward = useKeyboardControls<Controls>(state => state.forward)
  const back = useKeyboardControls<Controls>(state => state.back)
  const left = useKeyboardControls<Controls>(state => state.left)
  const right = useKeyboardControls<Controls>(state => state.right)
  const jump = useKeyboardControls<Controls>(state => state.jump)
  const iForward = useInterfaceOperator(state => state.forward)
  const iBack = useInterfaceOperator(state => state.back)
  const iLeft = useInterfaceOperator(state => state.left)
  const iRight = useInterfaceOperator(state => state.right)
  const iJump = useInterfaceOperator(state => state.jump)

  return useMemo(() => {
    return [forward || iForward, back || iBack, left || iLeft, right || iRight, jump || iJump]
  }, [forward || iForward, back || iBack, left || iLeft, right || iRight, jump || iJump])
}


export {
  useOperater
}