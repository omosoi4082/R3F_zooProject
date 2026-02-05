import { useFBX } from '@react-three/drei'


export const ZoonMap = () => {
  const fbx = useFBX(`/models/map/zoo.FBX`);
  return <primitive position={[-50,-22,0]} object={fbx}></primitive>
}