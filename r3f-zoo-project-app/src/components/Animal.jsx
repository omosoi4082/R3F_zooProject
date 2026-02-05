import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useMemo, useRef } from 'react'
import { SkeletonUtils } from 'three-stdlib'


export const Animal = ({ name, ...props }) => {
  const group = useRef();
  const { scene, animations } = useGLTF(`/models/animals/${name}.glb`)
  const clone = useMemo(() => SkeletonUtils.clone(scene))
  const { actions } = useAnimations(animations, group)

  useEffect(() => {actions["Idle"].reset().play()})

  return (<group ref={group}><primitive {...props} object={clone}></primitive></group>)

}