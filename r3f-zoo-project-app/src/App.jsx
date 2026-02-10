import "./App.css";
import { Canvas } from '@react-three/fiber'
import { Environments } from "./components/Environments"
import { EditProvider } from './context/EditContext'
import { Overlay } from './components/overlay/Overlay'
import { useMemo } from 'react';
import { KeyboardControls } from '@react-three/drei';

export const Controls = {
  forward: "forward",
  back: "back",
  right: "right",
  left: "left",
  jump: "jump"
};

function App() {
  const map = useMemo(() => [
    { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
    { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
    { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
    { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
    { name: Controls.jump, keys: ["Space"] }
  ], [])
  return (
    <KeyboardControls map={map}>
      <EditProvider>
        <Canvas camera={{ position: [10, 50, 50] }}>
          <Environments />
        </Canvas>
        <Overlay />
      </EditProvider>
    </KeyboardControls>
  )
}

export default App
