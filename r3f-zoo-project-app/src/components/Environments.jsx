import { OrbitControls } from '@react-three/drei'
import { Animal } from './Animal'
import { ZoonMap } from './ZooMap'
import { Fragment, Suspense, useContext } from 'react'
import { Physics, RigidBody } from '@react-three/rapier'
import { Dion } from './Dino'
import { EditContext } from '../context/EditContext'
import { useFrame, useThree } from '@react-three/fiber'
import { Rtanny } from './Rtanny'

const py = 20;
export const Environments = () => {
  const { objects, isEditMode ,onObjectClicked,onPointMove} = useContext(EditContext);
  const { camera } = useThree();
  useFrame(() => {
    if (isEditMode) {
      camera.position.x = 0;
      camera.position.y = 300;
      camera.position.x = 0;
    }
  })
  return (<>
    {isEditMode ? (
      <gridHelper
        onPointerMove={onPointMove}
        args={[500, 100]}
        position={[0, py, 0]} />
    ) : null}

    <ambientLight intensity={4} />
    <directionalLight intensity={4} position={[3, 3, 3]} />
    <OrbitControls />
    <Suspense>
      <Physics gravity={[0,-9.81,0]}>
        <RigidBody 
        name="land"
        friction={3}  
        type='fixed' 
        colliders={"trimesh"} >
          <ZoonMap />
        </RigidBody>
        
        {objects.map(({ id, ...object }) => (
          <Fragment key={id}>
            {object.type === "animal" ? (<Animal objId={id} onClick={onObjectClicked}{...object} />) 
            : (<Dion objId={id} onClick={onObjectClicked}{...object} />)}
          </Fragment>
        ))}
        <Rtanny/>
      </Physics>
    </Suspense>
  </>)
}