import React from "react";
import { useGLTF } from "@react-three/drei";

useGLTF.preload("../../public/models/materials/RockPath.glb");

export default function Rocks() {
    // Load individual Rock Models
    const rockPath = useGLTF("../../public/models/materials/RockPath.glb").scene;

    return (
        <>
        <group>
            <primitive object={rockPath.clone()} position={[8, 0, -5]} scale={2} />
            <primitive object={rockPath.clone()} position={[10, 0, 1]} scale={2} />
            <primitive object={rockPath.clone()} position={[10, 0, -1]} scale={2} />
            <primitive object={rockPath.clone()} position={[10, 0, -3]} scale={2} />
            <primitive object={rockPath.clone()} position={[10, 0, -5]} scale={2} />
            <primitive object={rockPath.clone()} position={[12, 0, 1]} scale={2} />
            <primitive object={rockPath.clone()} position={[12, 0, 3]} scale={2} />
            <primitive object={rockPath.clone()} position={[12, 0, -1]} scale={2} />
            <primitive object={rockPath.clone()} position={[12, 0, -3]} scale={2} />
            <primitive object={rockPath.clone()} position={[12, 0, -5]} scale={2} />
            <primitive object={rockPath.clone()} position={[14, 0, 3]} scale={2} />
            <primitive object={rockPath.clone()} position={[14, 0, 1]} scale={2} />
            <primitive object={rockPath.clone()} position={[14, 0, -1]} scale={2} />
            <primitive object={rockPath.clone()} position={[14, 0, -3]} scale={2} />
            <primitive object={rockPath.clone()} position={[14, 0, 5]} scale={2} />
            <primitive object={rockPath.clone()} position={[16, 0, 5]} scale={2} />
            <primitive object={rockPath.clone()} position={[16, 0, 3]} scale={2} />
            <primitive object={rockPath.clone()} position={[16, 0, 1]} scale={2} />
            <primitive object={rockPath.clone()} position={[16, 0, -1]} scale={2} />
            <primitive object={rockPath.clone()} position={[16, 0, -3]} scale={2} />
            <primitive object={rockPath.clone()} position={[18, 0, -1]} scale={2} />
            <primitive object={rockPath.clone()} position={[18, 0, 1]} scale={2} />
            <primitive object={rockPath.clone()} position={[18, 0, 3]} scale={2} />
        </group>
        </>
    )
}