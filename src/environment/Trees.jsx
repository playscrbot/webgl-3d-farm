import React from "react";
import { useGLTF } from "@react-three/drei";

useGLTF.preload("../../public/models/environment/AutumnTree.glb");
useGLTF.preload("../../public/models/materials/TreeStump.glb");
useGLTF.preload("../../public/models/environment/BambooTree.glb");
useGLTF.preload("../../public/models/environment/BananaTree.glb");

export default function Trees() {
    // Load individual tree models
    const autumnTree = useGLTF("../../public/models/environment/AutumnTree.glb").scene;
    const bambooTree = useGLTF("../../public/models/environment/BambooTree.glb").scene;
    const bananaTree = useGLTF("../../public/models/environment/BananaTree.glb").scene;
    const treeStump = useGLTF("../../public/models/materials/TreeStump.glb").scene;

    return (
        <>
            {/* 🍌 Banana Trees */}
            <group>
                <primitive object={bananaTree.clone()} position={[6, 2.5, -2]} />
                <primitive object={bananaTree.clone()} position={[7, 2.5, -1]} />
                <primitive object={bananaTree.clone()} position={[6.5, 2.5, 0]} />
            </group>

            {/* 🪵 Tree Stump */}
            <primitive object={treeStump.clone()} position={[5, 0.5, 0]} />

            {/* 🍂 Autumn Trees */}
            <group>
                <primitive object={autumnTree.clone()} position={[3, 0, -45]} scale={2.5} />
                <primitive object={autumnTree.clone()} position={[4, 0, -46]} scale={2.5} />
                <primitive object={autumnTree.clone()} position={[5, 0, -45]} scale={2.5} />
            </group>

            {/* 🎍🍃 Bamboo Grove */}
            <group>
                <primitive object={bambooTree.clone()} position={[15, 0, 10]} scale={1.5} />
                <primitive object={bambooTree.clone()} position={[15, 0, 10]} scale={1} />
                <primitive object={bambooTree.clone()} position={[14.5, 0, 9.8]} scale={0.5} />
                <primitive object={bambooTree.clone()} position={[14.5, 0, 9.8]} scale={0.7} />
            </group>
        </>
    );
};