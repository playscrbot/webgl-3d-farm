import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

useGLTF.preload("../../public/models/environment/Grass.glb");
useGLTF.preload("../../public/models/environment/Fern.glb");
useGLTF.preload("../../public/models/environment/Mushroom.glb");
useGLTF.preload("../../public/models/environment/Plant.glb");

export default function Plants() {
    const fern = useGLTF("../../public/models/environment/Fern.glb").scene;
    const mushroom = useGLTF("../../public/models/environment/Mushroom.glb").scene;
    const plant = useGLTF("../../public/models/environment/Plant.glb").scene;

    return (
        <>
            {/* 🌾 Fern (Near the Tree Stump) */}
            <group>
                <primitive object={fern.clone()} position={[5, 0.02, -3]} />
            </group>

            {/* 🌸 Small Flower (Grows Near Banana Tree) */}
            <group>
                <primitive object={plant.clone()} position={[7, 0.05, -1]} />
                <primitive object={plant.clone()} position={[12, 0.05, -5]} />
                <primitive object={plant.clone()} position={[10, 0.05, -1]} />
                <primitive object={plant.clone()} position={[12, 0.05, 3]} />
                <primitive object={plant.clone()} position={[14, 0.05, 1]} />
                <primitive object={plant.clone()} position={[16, 0.05, -3]} />
                <primitive object={plant.clone()} position={[18, 0.05, 2]} />
            </group>

            {/* 🍄 Mushrooms (On the Rock path) */}
            <group>
                <primitive object={mushroom.clone()} position={[12, 0.05, -1]} />
                <primitive object={mushroom.clone()} position={[14, 0.05, -3]} />
                <primitive object={mushroom.clone()} position={[16, 0.05, 3]} />
                <primitive object={mushroom.clone()} position={[18, 0.05, -1]} />
            </group>
        </>
    );
}