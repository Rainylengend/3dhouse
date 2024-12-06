import { useInterfaceOperator } from "@/stores/interfaceOperator"
import { Controls } from "@/const"
import { useKeyboardControls } from "@react-three/drei"
import { useEffect, useRef, useState } from "react"
import { useOperater } from '@/hooks/useOperater'
import { useFirework } from '@/stores/firework'
import { classNames } from '@/utils'
import { Vector2 } from 'three'


function useMobileControl() {
  const controlRef = useRef<HTMLDivElement>(null)
  const controlPointRef = useRef<HTMLDivElement>(null)
  const changeDirection = useInterfaceOperator(state => state.changeDirection)
  const changeJump = useInterfaceOperator(state => state.changeJump)
  const [subscribeKeys] = useKeyboardControls<Controls>()

  useEffect(() => {
    const abortController = new AbortController()
    const currentCoord = {
      x: 0,
      y: 0
    }
    const currentTranslate = new Vector2()
    let isControlling = false

    function updateDirection() {
      const direction = new Vector2().copy(currentTranslate).normalize()
      direction.y *= -1
      changeDirection(
        direction
      )
    }
    controlRef.current?.addEventListener('pointerdown', (e) => {
      currentCoord.x = e.clientX
      currentCoord.y = e.clientY
      isControlling = true
    }, {
      signal: abortController.signal
    })
    window.addEventListener('pointerup', () => {
      isControlling = false
      currentTranslate.x = currentTranslate.y = 0
      updateControlPointPosition(0, 0)
      updateDirection()
      changeJump(false)
    }, {
      signal: abortController.signal
    })

    // 球的运动半径
    const ballRadius = 40

    controlRef.current!.addEventListener('pointermove', e => {
      if (!isControlling) {
        return
      }
      const { clientX, clientY } = e
      let distanceX = clientX - currentCoord.x
      let distanceY = clientY - currentCoord.y
      currentTranslate.x += distanceX
      currentTranslate.y += distanceY
      const length = currentTranslate.length()
      if (length > ballRadius) {
        currentTranslate.normalize().multiplyScalar(40)
      }
      updateControlPointPosition(currentTranslate.x, currentTranslate.y)
      updateDirection()
      currentCoord.x = clientX
      currentCoord.y = clientY
    })
    function updateControlPointPosition(x: number, y: number, needTransition: boolean = false) {
      controlPointRef.current!.style.cssText = `
      transform: translate(${x}px, ${y}px); 
      ${needTransition ? 'transition: transform 0.15s;' : ''}
      `
    }

    const unsubKeys = subscribeKeys((state) => [state.forward, state.back, state.left, state.right], ([forward, back, left, right]) => {
      const vec2 = new Vector2(+right - +left, +back - +forward).normalize().multiplyScalar(ballRadius)
      updateControlPointPosition(vec2.x, vec2.y, true)
    })
    return () => {
      abortController.abort()
      unsubKeys()
    }
  }, [])
  return {
    controlRef,
    controlPointRef
  }
}

function Operate() {
  const changeJump = useInterfaceOperator(state => state.changeJump)

  const fireworkIsPlaying = useFirework(state => state.fireworkIsPlaying)
  const changeState = useFirework(state => state.changeState)
  const [isShowFireBtn, setIsShowFireBtn] = useState(false)
  useEffect(() => {
    return useFirework.subscribe(d => d.cameraPosition, position => {
      const isShowFireBtn = position.y >= 4
      if (!isShowFireBtn) {
        changeState(false)
      }
      setIsShowFireBtn(isShowFireBtn)
    })
  }, [])

  const { controlRef, controlPointRef } = useMobileControl()
  const operate = useOperater()

  return (
    <div className="text-xs absolute w-fit bottom-[1vh]  inset-x-0 mx-auto pointer-events-auto bg-slate-600 p-3 bg-opacity-60 rounded">
      <div ref={controlRef} className="touch-none w-32 h-32 rounded-full bg-slate-50 bg-opacity-30 flex border-2 border-violet-600">
        <div ref={controlPointRef} className="w-10 h-10 rounded-full bg-slate-50 m-auto
         border-2 border-violet-600"></div>
      </div>

      <div className={classNames("bg-white", 'mt-1', 'p-2', 'leading-none', 'rounded-sm', operate.y === 0 && 'bg-opacity-30', 'text-center', 'mx-auto', 'transition-opacity', 'select-none')} onPointerDown={() => changeJump(true)}>SPACE</div>
      {
        isShowFireBtn && (
          <div className={classNames("bg-white", 'mt-1', 'p-2', 'leading-none', 'rounded-sm', !fireworkIsPlaying && 'bg-opacity-30', 'text-center', 'mx-auto', 'transition-opacity', 'select-none')} onPointerDown={() => changeState(!fireworkIsPlaying)}>烟花</div>
        )
      }

    </div>
  )
}

export {
  Operate
}