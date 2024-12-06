import { useProgress } from '@react-three/drei'
import { useGlobal } from '@/stores/global'
import { useEffect } from 'react'
import { classNames } from '@/utils'

function Loading() {
  const { progress } = useProgress()
  const changeState = useGlobal(state => state.changeState)
  useEffect(() => {
    if (progress === 100) {
      changeState(true)
    }
  }, [progress])
  return (
    <>
      <div className={classNames('w-full', 'pointer-events-auto', 'bg-sky-100', 'h-full', 'absolute', ' -z-10', 'flex', progress === 100 && 'animate-fadeout')}>
        <div className='m-auto w-full px-[5vw]' >
          <div style={{ width: progress + '%' }} className='h-2 bg-purple-700 rounded-full transition-[width] origin-left'>
            <div className='text-right text-purple-700 text-3xl font-mono relative -top-9'>{progress.toFixed(2)}</div>
          </div>
        </div >
      </div >

    </>
  )
}

export {
  Loading
}