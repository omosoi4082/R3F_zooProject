import { useAnimations, useGLTF, useKeyboardControls } from '@react-three/drei'
import { useContext, useEffect, useRef, useState } from 'react'
import { CapsuleCollider, RigidBody } from '@react-three/rapier';
import { Controls } from '../App';
import { useFrame } from '@react-three/fiber';
import { EditContext } from '../context/EditContext'

const JUMP_FORCE = 10;
const MOVE_SP = 5;
const MAX_VEL = 10;

const offset = {
  x: 160,
  y: 10,
  z: 100
}
export const Rtanny = () => {
  const group = useRef();
  const body = useRef();
  const rtannyRef = useRef();

  const [animation, setAnimation] = useState("Idle")
  const { scene, animations } = useGLTF(`/models/rtanny.glb`)
  const { actions } = useAnimations(animations, group)
  const { isEditMode, selectdeId } = useContext(EditContext)

  scene.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = true;
    }
  })
  // useEffect(() => {
  //   actions[animation].reset().play();
  //   return () => actions[animation].fadeOut();
  // }, [scene, animation]);
  useEffect(() => {
    const action = actions[animation];
    if (!action) return;

    action.reset().fadeIn(0.2).play();

    return () => {
      action.fadeOut(0.2);
    };
  }, [animation, actions]);



  const jumpPressed = useKeyboardControls((state) => state[Controls.jump])
  const leftPressed = useKeyboardControls((state) => state[Controls.left])
  const rightPressed = useKeyboardControls((state) => state[Controls.right])
  const backPressed = useKeyboardControls((state) => state[Controls.back])
  const forwardPressed = useKeyboardControls((state) => state[Controls.forward])

  const isOnland = useRef(false)
  const isKeyPressed = forwardPressed || leftPressed || rightPressed || backPressed;

  useFrame((state) => {
    if (!body.current || !group.current || !rtannyRef.current) return;
    if (isEditMode) return;
    if (selectdeId) return;

    const { x, y, z } = group.current.children[0].position;
    const realX = offset.x + x;
    const realY = offset.y + y;
    const realZ = offset.z + z;
    state.camera.position.x = realX;
    state.camera.position.y = realY + 40;
    state.camera.position.z = realZ + 60;
    state.camera.lookAt(realX, realY, realZ);

    const impulse = { x: 0, y: 0, z: 0 };

    if (jumpPressed && isOnland.current) {
      impulse.y += JUMP_FORCE;
    }
    const linvel = body.current.linvel();

    let changeRotation = false;
    if (rightPressed && linvel.x < MAX_VEL) {
      impulse.x += MOVE_SP;
      changeRotation = true;
    }
    if (leftPressed && linvel.x > -MAX_VEL) {
      impulse.x -= MOVE_SP;
      changeRotation = true;
    }
    if (backPressed && linvel.z < MAX_VEL) {
      impulse.z += MOVE_SP;
      changeRotation = true;
    }
    if (forwardPressed && linvel.z > -MAX_VEL) {
      impulse.z -= MOVE_SP;
      changeRotation = true;
    }
    body.current.applyImpulse(impulse, true);

    if (changeRotation) {
      const angle = Math.atan2(linvel.x, linvel.z);
      rtannyRef.current.rotation.y = angle;

    }
    if (isKeyPressed) {
      setAnimation("Walk");
    } else {
      setAnimation("Idle");
    }
  })

  return (
    <group ref={group} position={[offset.x, offset.y, offset.z]}>
      <RigidBody
        ref={body}
        lockRotations
        colliders={false}
        onCollisionEnter={(e) => {
          if (e.other.rigidBodyObject.name == "land") {
            isOnland.current = true
          }
        }}
        onCollisionExit={(e) => {
          if (e.other.rigidBodyObject.name == "land") {
            isOnland.current = false
          }
        }}>
        <group ref={rtannyRef}>
          <primitive object={scene}></primitive>
          <CapsuleCollider args={[1, 0.7]} position={[0, 1.5, 0]} />
        </group>
      </RigidBody>
    </group>
  )
}