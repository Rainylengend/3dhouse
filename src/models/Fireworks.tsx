import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react';
import { useFirework } from '@/stores/firework'
import fireworksFragment from '@/shaders/fireworks/fragment.glsl?raw'
import fireworksVertex from '@/shaders/fireworks/vertex.glsl?raw'
import gsap from 'gsap';


const loader = new THREE.TextureLoader()
const textures = [
  loader.load('./textures/particles/1.png'),
  loader.load('./textures/particles/2.png'),
  loader.load('./textures/particles/3.png'),
  loader.load('./textures/particles/4.png'),
  loader.load('./textures/particles/5.png'),
  loader.load('./textures/particles/6.png'),
  loader.load('./textures/particles/7.png'),
  loader.load('./textures/particles/8.png')
]


const resolution = new THREE.Vector2()
type FireworksParams = { count: number, position: THREE.Vector3, texture: THREE.Texture, radius: number, scene: THREE.Scene, color: THREE.Color, size: number }
function createFirework({ count, position, texture, radius, scene, color, size }: FireworksParams) {
  const pointsArray = new Float32Array(count * 3)
  const sizesArray = new Float32Array(count)
  const timeMultipliersArray = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const spherical = new THREE.Spherical(radius * (0.75 + Math.random() * 0.25), Math.random() * Math.PI * 2, Math.random() * Math.PI)
    const position = new THREE.Vector3()
    position.setFromSpherical(spherical)
    pointsArray[i3] = position.x
    pointsArray[i3 + 1] = position.y
    pointsArray[i3 + 2] = position.z
    sizesArray[i] = Math.random()
    timeMultipliersArray[i] = 0.5 + Math.random() * 0.5
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(pointsArray, 3))
  geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizesArray, 1))
  geometry.setAttribute('aTimeMultiplier', new THREE.Float32BufferAttribute(timeMultipliersArray, 1))

  const material = new THREE.ShaderMaterial({
    fragmentShader: fireworksFragment,
    vertexShader: fireworksVertex,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uProgress: new THREE.Uniform(0),
      uResolution: new THREE.Uniform(resolution),
      uTexture: new THREE.Uniform(texture),
      uColor: new THREE.Uniform(color),
      uSize: new THREE.Uniform(size)
    }
  })
  texture.flipY = false
  const points = new THREE.Points(geometry, material)
  points.position.copy(position)
  scene.add(points)

  function destory() {
    scene.remove(points)
    geometry.dispose()
    material.dispose()
  }
  gsap.to(material.uniforms.uProgress, {
    value: 1,
    duration: 3,
    ease: 'linear',
    onComplete: destory
  })
}

let strength = 10
function Fireworks() {
  const { scene, camera } = useThree(state => {
    resolution.x = state.size.width * state.viewport.dpr
    resolution.y = state.size.width * state.viewport.dpr
    return {
      scene: state.scene,
      camera: state.camera,
      size: state.size
    }
  })
  const createRandomFirework = () => {
    const count = Math.round(400 + Math.random() * 1000)

    const position = new THREE.Vector3()
    position.setFromMatrixColumn(camera.matrix, 2)
    position.multiplyScalar(-20)
    position.add(camera.position)
    const cameraXias = new THREE.Vector3()
    cameraXias.setFromMatrixColumn(camera.matrix, 0)
    cameraXias.multiplyScalar((Math.random() - 0.5) * 24)
    position.add(cameraXias)
    position.y += (Math.random() - 0.5) * 6 + 2



    const size = 0.2 + Math.random() * 0.2
    const texture = textures[Math.floor(Math.random() * textures.length)]
    const radius = 1 + Math.random() * 1.5
    const color = new THREE.Color()
    color.setHSL(Math.random(), 1, 0.3)

    createFirework({
      count,
      position,
      texture,
      radius,
      scene,
      color,
      size,
    })
  }
  useEffect(() => {
    let timer: any
    let animationFrame: number
    const unsubscribe = useFirework.subscribe(state => state.fireworkIsPlaying, v => {
      if (!v) {
        clearTimeout(timer)
        cancelAnimationFrame(animationFrame)
        return
      }

      function doPlay() {
        createRandomFirework()
        timer = setTimeout(() => {
          animationFrame = requestAnimationFrame(doPlay)
        }, 100)
      }
      doPlay()
    })
    return () => {
      unsubscribe()
      clearTimeout(timer)
      cancelAnimationFrame(animationFrame)
    }
  }, [])
  return null
}

export {
  Fireworks
}