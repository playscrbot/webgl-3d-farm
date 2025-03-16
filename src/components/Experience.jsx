import React, { useState, useEffect } from "react";
import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";

import Player from "../characters/Player";

import Cow from "../animals/Cow";

import Trees from "../environment/Trees";
import Plants from "../environment/Plants";
import Rocks from "../environment/Rocks";
import River from "../environment/River";
import Buildings from "../environment/Buildings";

import Materials from "../environment/Materials";

const Experience = () => {
    return (
        <>
        {/* Lights */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={0.7} color={"#FFA500"} castShadow />

        {/* 3D Environment */}
        <Sky sunPosition={[100, 100, 20]} turbidity={8} rayleigh={2} mieCoefficient={0.005} mieDirectionalG={0.8} />

        <Physics gravity={[0, -9.8, 0]}>
            {/* Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow> 
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="green" />
            </mesh>

            {/* Player */}
            <Player />

            {/* Animals */}
            <Cow />

            {/* Trees */}
            <Trees />

            {/* Plants */}
            <Plants />

            {/* Rocks */}
            <Rocks />

            {/* Buildings */}
            <Buildings />

            {/* Materials */}
            <Materials />

            {/* River */}
            <River />
        </Physics>
        </>
    );
};

export default Experience;