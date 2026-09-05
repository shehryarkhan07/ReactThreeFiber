# ReactThreeFiber — 3D Sneaker Configurator

A single-page 3D sneaker configurator: pick colors for each part of a shoe (laces, mesh, sole, stripes, etc.) and rotate/zoom to inspect it in real time.

## Stack

- [Vite](https://vite.dev/) + React 19
- [three.js](https://threejs.org/) via [@react-three/fiber](https://github.com/pmndrs/react-three-fiber)
- [@react-three/drei](https://github.com/pmndrs/drei) (`OrbitControls`, `useGLTF`, `Environment`)
- [Tailwind CSS v4](https://tailwindcss.com/) for the UI panel
- [Zustand](https://github.com/pmndrs/zustand) for configurator state

## Features

- Live-updating 3D scene — color changes apply instantly to the model
- Per-part color swatches plus a native color picker
- Matte / glossy material finish toggle
- Auto-rotating camera that pauses while you interact
- Loading progress indicator while the model streams in
- Mobile-responsive layout (sidebar on desktop, bottom sheet on mobile)

## Getting started

```bash
npm install
npm run dev
```

## Project structure

```
src/
  components/
    Scene.jsx        — Canvas, camera, lights, OrbitControls
    Model.jsx         — loads the glb and applies part colors/finish
    ColorPicker.jsx    — swatch UI panel
  store/
    useConfigStore.js — Zustand store for colors/finish/active part
  App.jsx
```

The shoe model (`public/models/shoe-draco.glb`) is the well-known open-source sneaker asset from pmndrs' [floating-shoe](https://github.com/drcmda/floating-shoe) demo, with separately named mesh parts for laces, mesh, caps, inner, sole, stripes, band, and patch.
