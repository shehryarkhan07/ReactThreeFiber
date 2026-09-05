import { Environment, OrbitControls, useProgress } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useRef, useState } from 'react'
import Model from './Model'

function Loader() {
  const { active, progress } = useProgress()
  if (!active) return null
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-neutral-950">
      <div className="flex flex-col items-center gap-3 text-neutral-200">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-neutral-700 border-t-white" />
        <p className="text-sm tabular-nums text-neutral-400">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  )
}

const IDLE_DELAY_MS = 2500

export default function Scene() {
  const [autoRotate, setAutoRotate] = useState(true)
  const idleTimer = useRef(null)

  const handleInteractionStart = () => {
    clearTimeout(idleTimer.current)
    setAutoRotate(false)
  }

  const handleInteractionEnd = () => {
    clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => setAutoRotate(true), IDLE_DELAY_MS)
  }

  return (
    <div className="relative h-full w-full">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 2.75], fov: 40 }}
      >
        <color attach="background" args={['#0e0e11']} />
        <ambientLight intensity={0.4} />
        <spotLight
          intensity={0.6}
          angle={0.25}
          penumbra={1}
          position={[5, 8, 5]}
          castShadow
        />
        <Suspense fallback={null}>
          <Model position={[0, -0.15, 0]} />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls
          makeDefault
          enablePan={false}
          minDistance={1.5}
          maxDistance={5}
          autoRotate={autoRotate}
          autoRotateSpeed={1.2}
          onStart={handleInteractionStart}
          onEnd={handleInteractionEnd}
        />
      </Canvas>
      <Loader />
    </div>
  )
}
