import { OrbitControls } from '@react-three/drei'
import { Animal } from './Animal'
import { ZoonMap } from './ZooMap'
import { Suspense, useContext } from 'react'
import { Physics, RigidBody } from '@react-three/rapier'
import { Dion } from './Dino'
import { EditContext } from '../context/EditContext'
import { useFrame, useThree } from '@react-three/fiber'

const py = 20;
export const Environments = () => {
  const { isEditMode } = useContext(EditContext);
const {camera}= useThree();
useFrame(()=>{
  if(isEditMode){
    camera.position.x=0;
    camera.position.y=500;
    camera.position.x=0;
  }
})
  return (<>
    {isEditMode ? (<gridHelper args={[500, 50]} position={[0, py, 0]} />) : null}

    <ambientLight intensity={4} />
    <directionalLight intensity={4} position={[3, 3, 3]} />
    <OrbitControls />
    <Suspense>
      <Physics >
        <RigidBody type='fixed' colliders={"trimesh"} >
          <ZoonMap />
        </RigidBody>
        <RigidBody enabledRotations={[false, false, false]} colliders={"hull"} >
          <Animal name={"Alpaca"} position={[-15, py, 0]} />
        </RigidBody>
        <RigidBody lockRotations colliders={"hull"} >
          <Dion name={"TRex"} position={[10, py, 0]} />
        </RigidBody>
      </Physics>
    </Suspense>
  </>)
}