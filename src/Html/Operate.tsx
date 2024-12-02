import { useInterfaceOperator } from "@/stores/interfaceOperator"
import { Controls } from "@/const"
import { useMemo, useEffect } from "react"
import { useOperater } from '@/hooks/useOperater'
import { classNames } from '@/utils'

function Operate() {
  const changeKeyResponse = useInterfaceOperator(state => state.changeKeyResponse)
  const [forward, back, left, right, jump] = useOperater()

  const onPress = useMemo(() => {
    function pressFactory(controls: Controls) {
      return () => {
        changeKeyResponse(controls, true)
      }
    }

    return {
      forward: pressFactory(Controls.forward),
      jump: pressFactory(Controls.jump),
      back: pressFactory(Controls.back),
      left: pressFactory(Controls.left),
      right: pressFactory(Controls.right),
    }
  }, [changeKeyResponse])

  useEffect(() => {
    const fn = () => {
      changeKeyResponse(Controls.back, false)
      changeKeyResponse(Controls.forward, false)
      changeKeyResponse(Controls.left, false)
      changeKeyResponse(Controls.right, false)
      changeKeyResponse(Controls.jump, false)
    }
    window.addEventListener('touchend', fn)
    return () => {
      window.removeEventListener('touchend', fn)
    }
  }, [])

  return (
    <div className="absolute w-fit bottom-[10vh]  inset-x-0 mx-auto pointer-events-auto">
      <div className={classNames("bg-white", 'p-4', 'leading-none', 'rounded-sm', !forward && 'bg-opacity-30', 'text-center', 'w-fit', 'mx-auto', 'transition-opacity', 'select-none')} onTouchStart={onPress.forward}>W</div>
      <div className=" flex gap-1 mt-1">
        <div className={classNames("bg-white", 'p-4', 'leading-none', 'rounded-sm', !left && 'bg-opacity-30', 'text-center', 'transition-opacity', 'select-none')} onTouchStart={onPress.left}>A</div>
        <div className={classNames("bg-white", 'p-4', 'leading-none', 'rounded-sm', !back && 'bg-opacity-30', 'text-center', 'transition-opacity', 'select-none')} onTouchStart={onPress.back}>S</div>
        <div className={classNames("bg-white", 'p-4', 'leading-none', 'rounded-sm', !right && 'bg-opacity-30', 'text-center', 'transition-opacity', 'select-none')} onTouchStart={onPress.right}>D</div>
      </div>
      <div className={classNames("bg-white", 'mt-1', 'p-4', 'leading-none', 'rounded-sm', !jump && 'bg-opacity-30', 'text-center', 'mx-auto', 'transition-opacity', 'select-none')} onTouchStart={onPress.jump}>SPACE</div>
    </div>
  )
}

export {
  Operate
}