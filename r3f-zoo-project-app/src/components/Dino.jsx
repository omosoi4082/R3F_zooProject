import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'
import { SkeletonUtils } from 'three-stdlib'


export const Dion=({name,...props})=>{
  const {scene}= useGLTF(`/models/dinos/${name}.glb`)
  const clone= useMemo(()=>SkeletonUtils.clone(scene))
  
  return<primitive {...props} object={clone}></primitive>
}