import { OrbitControls } from '@react-three/drei'
import { Animal } from './Animal'
import { ZoonMap } from './ZooMap'
export const Environments = () => {
  return (<>
    <gridHelper args={[10, 10]} />
    <ambientLight intensity={4} />
    <directionalLight intensity={4} position={[3, 3, 3]} />
    <OrbitControls />
    {/* <Animal name={"Alpaca"}/>
     <Animal name={"Alpaca"}position={[3,0,0]}/> */}
    <ZoonMap />
  </>)
}