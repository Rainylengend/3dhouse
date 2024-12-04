import fragmentShader from '@/shaders/particleCursor/fragment.glsl?raw'
import vertexShader from '@/shaders/particleCursor/vertex.glsl?raw'
import * as THREE from 'three'
import { particleCursorTexture } from '@/assets/texture'
import { useThree, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

const particlesGeometry = new THREE.PlaneGeometry(2.5, 2.5, 128, 128)
particlesGeometry.setIndex(null)
const intensitiesArray = new Float32Array(particlesGeometry.attributes.position.count)
const anglesArray = new Float32Array(particlesGeometry.attributes.position.count)

for (let i = 0; i < particlesGeometry.attributes.position.count; i++) {
  intensitiesArray[i] = Math.random()
  anglesArray[i] = Math.random() * Math.PI * 2
}
particlesGeometry.setAttribute('aIntensity', new THREE.BufferAttribute(intensitiesArray, 1))
particlesGeometry.setAttribute('aAngle', new THREE.BufferAttribute(anglesArray, 1))

function ParticlesCursor() {
  useThree(state => {
    particlesCursorMaterial.uniforms.uResolution.value.x = state.size.width * state.viewport.dpr
    particlesCursorMaterial.uniforms.uResolution.value.y = state.size.width * state.viewport.dpr
  })

  const placeholderRef = useRef<THREE.Mesh>(null)

  useFrame(state => {
    if (!placeholderRef.current) {
      return
    }
    const intersections = state.raycaster.intersectObject(placeholderRef.current)
    const uv = intersections?.[0]?.uv!
    drawImage(uv)
  })
  return (
    <>
      <points rotation={[0, Math.PI / 2, 0]} position={[-2.8, 2, -3.2]} geometry={particlesGeometry} material={particlesCursorMaterial}>
      </points>
      <mesh ref={placeholderRef} visible={false} rotation={[0, Math.PI / 2, 0]} position={[-2.8, 1.6, 0]}>
        <planeGeometry args={[2.5, 2.5]} />
      </mesh>
    </>
  )
}


function createCanvas() {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const context = canvas.getContext('2d')!
  context.fillRect(0, 0, canvas.width, canvas.height)
  const glowImage = new Image()
  glowImage.src = './glow.png'
  const glowSize = canvas.width * 0.25
  const canvasTexture = new THREE.CanvasTexture(canvas)

  const canvasCursorPrevious = new THREE.Vector2(9999, 9999)
  const canvasCursor = new THREE.Vector2(9999, 9999)
  function drawImage(uv?: THREE.Vector2) {
    if (uv) {
      canvasCursor.x = uv.x * canvas.width
      canvasCursor.y = (1 - uv.y) * canvas.height
    }

    const cursorDistance = canvasCursorPrevious.distanceTo(canvasCursor)
    canvasCursorPrevious.copy(canvasCursor)
    const alpha = Math.min(cursorDistance * 0.1, 1)

    context.globalCompositeOperation = 'source-over'
    context.globalAlpha = 0.02
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.globalAlpha = alpha
    context.globalCompositeOperation = 'lighten'
    context.drawImage(
      glowImage,
      canvasCursor.x - glowSize * 0.5,
      canvasCursor.y - glowSize * 0.5,
      glowSize,
      glowSize
    )
    canvasTexture.needsUpdate = true
  }
  return {
    drawImage,
    canvasTexture
  }
}

const { drawImage, canvasTexture } = createCanvas()


const particlesCursorMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  // blending: THREE.AdditiveBlending,
  uniforms: {
    uPictureTexture: new THREE.Uniform(particleCursorTexture),
    uResolution: new THREE.Uniform(new THREE.Vector2()),
    uDisplacementTexture: new THREE.Uniform(canvasTexture),
  }
})

export {
  ParticlesCursor
}