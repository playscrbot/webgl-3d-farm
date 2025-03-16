import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

useGLTF.preload("../../public/models/materials/Scarecrow.glb");

export default function Materials() {
    const scarecrow = useGLTF("../../public/models/materials/Scarecrow.glb").scene;

    return (
        <>
        <group position={[6, -0.2, 12]}>
            <primitive object={scarecrow.clone()} />
        </group>
        </>
    );
}