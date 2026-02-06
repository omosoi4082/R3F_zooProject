import { useAnimations, useGLTF } from '@react-three/drei'
import { useContext, useEffect, useMemo, useRef } from 'react'
import { SkeletonUtils } from 'three-stdlib'
import { EditContext } from '../context/EditContext';
import { RigidBody } from '@react-three/rapier';


export const Animal = ({ name, objId, onClick, position, ...props }) => {
  const group = useRef();
  const { scene, animations } = useGLTF(`/models/animals/${name}.glb`)
  const clone = useMemo(() => SkeletonUtils.clone(scene))
  const { actions } = useAnimations(animations, group)
  const { isEditMode, selectdeId, draggedPosition } = useContext(EditContext)
  const isSelect = objId === selectdeId

  useEffect(() => { actions["Idle"].reset().play() })

  return (
    <>
      {isEditMode ? (
        <group onClick={onClick(objId)}
          scale={[2.5, 2.5, 2.5]}
          position={isSelect ? draggedPosition : position}
          {...props}
          ref={group}>
            <mesh>
              <boxGeometry args={[3,1,4]}/>
              <meshBasicMaterial transparent opacity={0.7} color={"green"}/>
            </mesh>
          <primitive object={clone}></primitive>
        </group>)
        : (
          <RigidBody
            lockRotations
            colliders={"hull"}>
            <group {...props} ref={group}>
              <primitive object={clone}></primitive>
            </group>
          </RigidBody>
        )}
    </>

  )

}