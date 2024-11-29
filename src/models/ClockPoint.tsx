import * as THREE from 'three'
import { useEffect } from 'react'

type Props = {
  obj3d: THREE.Object3D
}
function ClockPoint({ obj3d }: Props) {
  const secondPoint = obj3d.children.find((obj) => obj.name === 'secondPoint')
  const minutePoint = obj3d.children.find((obj) => obj.name === 'minutePoint')
  const hourPoint = obj3d.children.find((obj) => obj.name === 'hourPoint')

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date()
      const h = d.getHours() % 12 / 6 * Math.PI
      const m = d.getMinutes() / 30 * Math.PI
      const s = d.getSeconds() / 30 * Math.PI

      secondPoint!.rotation.x = s
      minutePoint!.rotation.x = m
      hourPoint!.rotation.x = h
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  })

  return (
    <>
      <primitive object={obj3d} />
    </>
  )
}

export {
  ClockPoint
}