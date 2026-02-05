import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useMemo, useRef } from 'react'
import { SkeletonUtils } from 'three-stdlib'

export const Dion=({name,...props})=>{
   const group = useRef();
  const {scene,animations}= useGLTF(`/models/dinos/${name}.glb`)
  const clone= useMemo(()=>SkeletonUtils.clone(scene))
   const { actions } = useAnimations(animations, group)
    useEffect(() => { 
      
      actions[`Armature|${name}_Idle`].reset().play()
    })
  return(<group ref={group}><primitive {...props} object={clone}></primitive></group>)
}