import ColorPicker from './components/ColorPicker'
import Scene from './components/Scene'

export default function App() {
  return (
    <div className="flex h-svh w-svw flex-col md:flex-row">
      <div className="min-h-0 flex-1">
        <Scene />
      </div>
      <div className="h-64 shrink-0 md:h-full">
        <ColorPicker />
      </div>
    </div>
  )
}
