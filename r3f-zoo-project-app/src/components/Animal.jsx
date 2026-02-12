import { useAnimations, useGLTF } from '@react-three/drei'
import { useContext, useEffect, useMemo, useRef } from 'react'
import { SkeletonUtils } from 'three-stdlib'
import { EditContext } from '../context/EditContext';
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import * as THREE from "three"

export const Animal = ({ name, objId, onClick, position, ...props }) => {
  const group = useRef();
  const prevAnimation = useRef();

  const { scene, animations } = useGLTF(`/models/animals/${name}.glb`)
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { actions } = useAnimations(animations, clone)
  const { isEditMode, selectdeId, draggedPosition } = useContext(EditContext)
  const isSelect = objId === selectdeId

  scene.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = true;
    }
  })
  useEffect(() => {
    if (!actions) return;
    const nextAnimation = isSelect ? "Eating" : "Idle";
    if (!actions[nextAnimation]) return;
    const nextAction = actions[nextAnimation];
    nextAction.reset().fadeIn(0.2).play();

    if (
      prevAnimation.current &&
      prevAnimation.current !== nextAnimation
    ) {
      actions[prevAnimation.current]?.fadeOut(0.2);
    }
    prevAnimation.current = nextAnimation;

  }, [isSelect, actions]);


  useFrame((state) => {
    if (isSelect && !isEditMode) {
      const [offsetX, offsetY, offsetZ] = position;
      const { x, y, z } = group.current.children[0].position;
      const realX = offsetX + x;
      const realY = offsetY + y;
      const realZ = offsetZ + z;
      state.camera.lookAt(realX, realY, realZ);
      state.camera.position.lerp(new THREE.Vector3(realX, realY + 10, realZ + 20), 0.05)
    }

  })
  return (
    <>
      {isEditMode ? (
        <group onClick={onClick(objId)}
          scale={[2.5, 2.5, 2.5]}
          position={isSelect ? draggedPosition : position}
          {...props}
          ref={group}>
          <mesh>
            <boxGeometry args={[3, 1, 4]} />
            <meshBasicMaterial transparent opacity={0.7} color={"green"} />
          </mesh>
          <primitive object={clone}></primitive>
        </group>)
        : (
          <group ref={group} position={position}>
            <RigidBody
              {...props}
              lockRotations
              colliders={"hull"}>
              <group onClick={onClick(objId)}>
                <primitive object={clone}></primitive>
              </group>
            </RigidBody>
          </group>
        )}
    </>

  )

}