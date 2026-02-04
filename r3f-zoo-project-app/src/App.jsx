import "./App.css";
import { Canvas } from '@react-three/fiber'
import{Environments} from "./components/Environments"

function App() {

  return (
    <Canvas camera={{position:[10,10,10]}}>
     <Environments/>
    </Canvas>
  )
}

export default App
