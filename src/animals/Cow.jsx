import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

useGLTF.preload("../../public/models/animals/Cow.glb");

export default function Cow() {
  const group = useRef();
  const { scene, animations } = useGLTF("../../public/models/animals/Cow.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const action = actions[Object.keys(actions)[3]]; // Get the first animation
      const interval = setInterval(() => {
        action.reset().play();
      }, 10000); // Play every 10 seconds

      return () => clearInterval(interval);
    }
  }, [actions]);

  return (
    <group position={[10, 0, -30]} scale={0.3} rotation={[0, Math.PI / 2, 0]}>
      <primitive ref={group} object={scene} />
    </group>
  );
};