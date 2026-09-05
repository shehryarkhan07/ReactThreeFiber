import { PART_NAMES, useConfigStore } from '../store/useConfigStore'

const PALETTE = [
  '#ffffff',
  '#1d1d1f',
  '#e5e5e5',
  '#e63946',
  '#f4a261',
  '#ffd60a',
  '#2a9d8f',
  '#3a86ff',
  '#8338ec',
  '#ff5d8f',
]

const PART_LABELS = {
  laces: 'Laces',
  mesh: 'Mesh',
  caps: 'Toe Cap',
  inner: 'Inner',
  sole: 'Sole',
  stripes: 'Stripes',
  band: 'Ankle Band',
  patch: 'Heel Patch',
}

function PartRow({ part }) {
  const color = useConfigStore((state) => state.colors[part])
  const activePart = useConfigStore((state) => state.activePart)
  const setColor = useConfigStore((state) => state.setColor)
  const setActivePart = useConfigStore((state) => state.setActivePart)
  const isActive = activePart === part

  return (
    <div
      className={`rounded-lg border p-3 transition-colors ${
        isActive
          ? 'border-white/40 bg-white/5'
          : 'border-white/10 bg-white/[0.02]'
      }`}
      onMouseEnter={() => setActivePart(part)}
      onMouseLeave={() => setActivePart(null)}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-neutral-200">
          {PART_LABELS[part] ?? part}
        </span>
        <label
          className="h-6 w-6 cursor-pointer rounded-full border border-white/20 shadow-inner"
          style={{ backgroundColor: color }}
        >
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(part, e.target.value)}
            className="h-0 w-0 opacity-0"
          />
        </label>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {PALETTE.map((swatch) => (
          <button
            key={swatch}
            type="button"
            aria-label={`Set ${part} to ${swatch}`}
            onClick={() => setColor(part, swatch)}
            className={`h-5 w-5 rounded-full border transition-transform hover:scale-110 ${
              color.toLowerCase() === swatch
                ? 'border-white ring-1 ring-white'
                : 'border-white/20'
            }`}
            style={{ backgroundColor: swatch }}
          />
        ))}
      </div>
    </div>
  )
}

export default function ColorPicker() {
  const finish = useConfigStore((state) => state.finish)
  const setFinish = useConfigStore((state) => state.setFinish)
  const reset = useConfigStore((state) => state.reset)

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto bg-neutral-950/95 p-4 text-neutral-100 backdrop-blur md:w-80 md:border-l md:border-white/10">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">
          Sneaker Configurator
        </h1>
        <p className="text-xs text-neutral-500">
          Click a swatch to recolor a part. Drag to rotate, scroll to zoom.
        </p>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] p-3">
        <span className="text-sm font-medium text-neutral-200">Finish</span>
        <div className="flex overflow-hidden rounded-md border border-white/10">
          {['matte', 'glossy'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFinish(option)}
              className={`px-3 py-1 text-xs capitalize transition-colors ${
                finish === option
                  ? 'bg-white text-neutral-900'
                  : 'bg-transparent text-neutral-300 hover:bg-white/10'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {PART_NAMES.map((part) => (
          <PartRow key={part} part={part} />
        ))}
      </div>

      <button
        type="button"
        onClick={reset}
        className="mt-auto rounded-lg border border-white/10 bg-white/[0.02] py-2 text-sm text-neutral-300 transition-colors hover:bg-white/10"
      >
        Reset colors
      </button>
    </div>
  )
}
