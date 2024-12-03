import { useEffect } from "react";
import { useThree } from "@react-three/fiber"
import { CameraControls } from "@/utils/CameraControls";


const CameraController = function () {
  const { camera, canvas } = useThree(state => {
    return {
      camera: state.camera,
      canvas: state.gl.domElement,
    }

  })
  useEffect(() => {
    const controls = new CameraControls(camera, canvas)
    return () => {
      controls.dispose()
    }
  }, [])
  return null
}

export {
  CameraController
}