import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'
import { SkeletonUtils } from 'three-stdlib'


export const Animal=({name,...props})=>{
  const {scene}= useGLTF(`/models/animals/${name}.glb`)
  const clone= useMemo(()=>SkeletonUtils.clone(scene))
  
  return<primitive {...props} object={clone}></primitive>
}