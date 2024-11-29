
function Operate() {
  return (
    <div className="absolute w-fit bottom-[10vh]  inset-x-0 mx-auto pointer-events-auto">
      <div className="bg-white p-4 leading-none rounded-sm bg-opacity-30 text-center w-fit mx-auto cursor-pointer">W</div>
      <div className=" flex gap-1 mt-1">
        <div className="bg-white p-4 leading-none rounded-sm bg-opacity-30 cursor-pointer">A</div>
        <div className="bg-white p-4 leading-none rounded-sm bg-opacity-30 cursor-pointer">S</div>
        <div className="bg-white p-4 leading-none rounded-sm bg-opacity-30 cursor-pointer">D</div>
      </div>
      <div className="bg-white p-4 leading-none rounded-sm bg-opacity-30 mt-1 text-center cursor-pointer">SPACE</div>
    </div>
  )
}

export {
  Operate
}