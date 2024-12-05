import { useInterfaceOperator } from "@/stores/interfaceOperator"
import { Controls } from "@/const"
import { useMemo, useEffect, useRef } from "react"
import { useOperater } from '@/hooks/useOperater'
import { useFirework } from '@/stores/firework'
import { classNames } from '@/utils'

function Operate() {
  const changeKeyResponse = useInterfaceOperator(state => state.changeKeyResponse)
  const [forward, back, left, right, jump] = useOperater()
  const containerRef = useRef<HTMLDivElement>(null)
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
    containerRef.current!.addEventListener('touchend', fn)
    return () => {
      containerRef.current!.removeEventListener('touchend', fn)
    }
  }, [])

  const fireworkIsPlaying = useFirework(state => state.fireworkIsPlaying)
  const changeState = useFirework(state => state.changeState)

  return (
    <div ref={containerRef} className="absolute w-fit bottom-[1vh]  inset-x-0 mx-auto pointer-events-auto bg-slate-600 p-3 bg-opacity-60 rounded">
      <div className={classNames("bg-white", 'p-2', 'leading-none', 'rounded-sm', !forward && 'bg-opacity-30', 'text-center', 'w-fit', 'mx-auto', 'transition-opacity', 'select-none')} onTouchStart={onPress.forward}>W</div>
      <div className=" flex gap-1 mt-1">
        <div className={classNames("bg-white", 'p-2', 'leading-none', 'rounded-sm', !left && 'bg-opacity-30', 'text-center', 'transition-opacity', 'select-none')} onTouchStart={onPress.left}>A</div>
        <div className={classNames("bg-white", 'p-2', 'leading-none', 'rounded-sm', !back && 'bg-opacity-30', 'text-center', 'transition-opacity', 'select-none')} onTouchStart={onPress.back}>S</div>
        <div className={classNames("bg-white", 'p-2', 'leading-none', 'rounded-sm', !right && 'bg-opacity-30', 'text-center', 'transition-opacity', 'select-none')} onTouchStart={onPress.right}>D</div>
      </div>
      <div className={classNames("bg-white", 'mt-1', 'p-2', 'leading-none', 'rounded-sm', !jump && 'bg-opacity-30', 'text-center', 'mx-auto', 'transition-opacity', 'select-none')} onTouchStart={onPress.jump}>SPACE</div>
      <div className={classNames("bg-white", 'mt-1', 'p-2', 'leading-none', 'rounded-sm', !fireworkIsPlaying && 'bg-opacity-30', 'text-center', 'mx-auto', 'transition-opacity', 'select-none')} onPointerDown={() => changeState(!fireworkIsPlaying)}>烟花</div>
    </div>
  )
}

export {
  Operate
}