import { useKeyboardControls } from "@react-three/drei"
import { Controls } from "@/const"
import { useMemo } from "react"
import { useInterfaceOperator } from '@/stores/interfaceOperator'
import { Vector3 } from 'three'

function useOperater() {
  const forward = useKeyboardControls<Controls>(state => state.forward)
  const back = useKeyboardControls<Controls>(state => state.back)
  const left = useKeyboardControls<Controls>(state => state.left)
  const right = useKeyboardControls<Controls>(state => state.right)
  const jump = useKeyboardControls<Controls>(state => state.jump)
  const direction = useInterfaceOperator(state => state.direction)
  const iJump = useInterfaceOperator(state => state.jump)

  return useMemo(() => {
    const len = direction.length()

    const z = len > 0 ? direction.y : (+forward - +back)
    const x = len > 0 ? direction.x : (+right - +left)
    const y = +iJump || +jump
    return new Vector3(x, y, z)
  }, [direction, forward, back, left, right, jump, iJump])
}


export {
  useOperater
}