import "./App.css";
import { Canvas } from '@react-three/fiber'
import { Environments } from "./components/Environments"
import { EditProvider } from './context/EditContext'
import { Overlay } from './components/overlay/Overlay'

function App() {

  return (
    <EditProvider>
      <Canvas camera={{ position: [10, 50, 50] }}>
        <Environments />
      </Canvas>
      <Overlay/>
    </EditProvider>
  )
}

export default App
