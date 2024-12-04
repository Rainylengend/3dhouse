import { Operate } from './Operate'

function Entry() {
  return (
    <div className="absolute w-full h-full top-0 left-0 overflow-auto z-10 pointer-events-none ">
      <Operate />
    </div>
  )
}

export {
  Entry
}