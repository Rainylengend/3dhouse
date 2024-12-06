import { Operate } from './Operate'
import { Loading } from './Loading'
import { useGlobal } from '@/stores/global'
import { useEffect, useState } from 'react'

function Entry() {
  const [isShowLoading, setIsShowLoading] = useState(true)
  useEffect(() => {
    let timer: any
    const unsubscribeGlobal = useGlobal.subscribe(state => state.isReady, v => {
      clearTimeout(timer)
      if (v) {
        timer = setTimeout(() => {
          setIsShowLoading(false)
        }, 1500)
      } else {
        setIsShowLoading(true)
      }
    })
    return () => {
      clearTimeout(timer)
      unsubscribeGlobal()
    }
  }, [])
  return (
    <div className="absolute w-full h-full top-0 left-0 overflow-auto z-10 pointer-events-none ">
      <Operate />

      {
        isShowLoading ? (
          <Loading />
        ) : (
          null
        )
      }

    </div>
  )
}

export {
  Entry
}