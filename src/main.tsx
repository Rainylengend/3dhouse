import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import '@/styles/index.css'
import { loadTexture } from '@/assets/texture.ts'
import { loadModel } from '@/assets/model.ts'
loadTexture()
loadModel()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
