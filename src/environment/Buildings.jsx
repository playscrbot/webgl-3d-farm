import React from "react";
import { useGLTF } from "@react-three/drei";

useGLTF.preload("../../public/models/buildings/House.glb");
useGLTF.preload("../../public/models/environment/Crops.glb");
useGLTF.preload("../../public/models/buildings/WoodenTower.glb");

export default function Buildings() {
    const house = useGLTF("../../public/models/buildings/House.glb").scene;
    const crops = useGLTF("../../public/models/environment/Crops.glb").scene;
    const woodenTower = useGLTF("../../public/models/buildings/WoodenTower.glb").scene;

    return (
        <>
            <group>
                <primitive object={house.clone()} position={[-3, 0, 0]} scale={7.5} rotation={[0, Math.PI / 2, 0]} />
            </group>

            <group>
                <primitive object={crops.clone()} position={[7, 0, 9]} scale={[6.5, 5, 5]} rotation={[0, Math.PI / 2, 0]} />
            </group>

            <group>
                <primitive object={woodenTower.clone()} position={[12, 0, -42]} scale={10} rotation={[0, Math.PI / 2, 0]} />
            </group>
        </>
    )
}