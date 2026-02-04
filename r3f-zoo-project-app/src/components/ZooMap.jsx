import { useFBX } from '@react-three/drei'


export const ZoonMap = () => {
  const fbx = useFBX(`/models/map/zoo.FBX`);
  return <primitive object={fbx}></primitive>
}