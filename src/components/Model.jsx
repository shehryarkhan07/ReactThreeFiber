import { Center, useGLTF } from '@react-three/drei'
import { useConfigStore } from '../store/useConfigStore'

const MODEL_URL = '/models/shoe-draco.glb'

// Maps each named glTF material to the mesh node that uses it.
const PART_TO_NODE = {
  laces: 'shoe',
  mesh: 'shoe_1',
  caps: 'shoe_2',
  inner: 'shoe_3',
  sole: 'shoe_4',
  stripes: 'shoe_5',
  band: 'shoe_6',
  patch: 'shoe_7',
}

export default function Model(props) {
  const { nodes, materials } = useGLTF(MODEL_URL)
  const colors = useConfigStore((state) => state.colors)
  const finish = useConfigStore((state) => state.finish)
  const setActivePart = useConfigStore((state) => state.setActivePart)

  const finishProps =
    finish === 'glossy'
      ? { roughness: 0.15, metalness: 0.4 }
      : { roughness: 0.85, metalness: 0.05 }

  return (
    <Center {...props}>
      <group
        dispose={null}
        onPointerOver={(e) => {
          e.stopPropagation()
          setActivePart(e.object.material.name)
        }}
        onPointerOut={(e) => {
          if (e.intersections.length === 0) setActivePart(null)
        }}
      >
        {Object.entries(PART_TO_NODE).map(([part, node]) => (
          <mesh
            key={part}
            castShadow
            receiveShadow
            geometry={nodes[node].geometry}
            material={materials[part]}
            material-color={colors[part]}
            material-roughness={finishProps.roughness}
            material-metalness={finishProps.metalness}
          />
        ))}
      </group>
    </Center>
  )
}

useGLTF.preload(MODEL_URL)
