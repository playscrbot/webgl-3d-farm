# 3D Farm Environment with React Three Fiber

A immersive 3D farm environment built with React Three Fiber, featuring dynamic character controls, environmental interactions, and realistic shader effects.


## 🌟 Key Features
- **3D Environment** with buildings, vegetation, and animated elements
- **Player Controller** with WASD/Arrow Key movement and smooth animations
- **Dynamic Third-Person Camera** with smooth follow system
- **Physics Simulation** using @react-three/cannon
- **Custom Water Shader** with realistic flow and foam effects
- **Animated Animals** (Cow with a periodic animation)
- **Optimized Asset Loading** with GLTF models and preloading
- **Interactive Elements** (Rock paths, crops, wooden structures)


## 🛠️ Main Components

### `App.jsx` - Core Application
```javascript
const App = () => {
  return (
    <KeyboardControls
    map={[
      { name: "forward", keys: ["ArrowUp", "w", "W"] },
      { name: "backward", keys: ["ArrowDown", "s", "S"] },
      { name: "left", keys: ["ArrowLeft", "a", "A"] },
      { name: "right", keys: ["ArrowRight", "d", "D"] },
    ]}
  >
    <Canvas shadows camera={{ position: [0, 8, 12], fov: 45 }}>
      <Experience />
    </Canvas>
  </KeyboardControls>
  );
};

export default App;
```
- Sets up the main Canvas with proper camera configuration
- Implements keyboard controls for player movement
- Manages the overall 3D scene context


### `Experience.jsx` - World Manager
```javascript
import React, { useState, useEffect } from "react";
import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
.....
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
            .....
        </Physics>
        </>
    );
};

export default Experience;
```

- Manages all environmental elements and physics simulation:
   |- Sets up lighting and atmospheric effects
   |- Coordinates all interactive elements:
   |- Player character
   |- Animals (Cow with periodic animation)
   |- Environmental elements (Trees, plants, buildings)
   |- Physics-enabled ground plane
   |- Custom water system with shader effects

### `Player.jsx` - Character Controller
- Implements smooth character movement (WALK_SPEED = 0.05, RUN_SPEED = 0.1)
- Handles animation blending between idle/walk/run states
- Maintains third-person camera follow system:
```javascript
const CAMERA_OFFSET = new THREE.Vector3(0, 4, 12);
camera.position.lerp(cameraTarget, 0.1);
```

## ⬇️ Installation
1.Clone repository:
```bash
git clone https://github.com/playscrbot/webgl-3d-farm.git
```

2.Install dependencies:
```bash
npm install
```
**Note:** Remember that, You have to delete the node_modules and yarn.lock file to run this command on terminal

3.Generate Yarn Lock:
```bash
yarn install
```
**Note:** This will generate the yarn lock file you deleted, but you have to do it since the packages are in a new environment (Your PC)

4.Start development server:
```bash
yarn run dev
```


## 📂 Project Structure
```bash
public/
└── models/
    ├── animals/          # Animated GLB models
    │   └── Cow.glb
    ├── buildings/        # Structural assets
    │   ├── House.glb
    │   └── WoodenTower.glb
    ├── environment/      # Nature assets
    │   ├── Crops.glb
    │   └── Grass.glb
    └── materials/        # Props and items
        └── Scarecrow.glb

src/
├── components/
│   ├── animals/          # Animal components
│   │   └── Cow.js
│   ├── characters/       # Player controller
│   │   └── Player.js
│   └── environment/      # World elements
│       ├── Buildings.js
│       ├── Plants.js
│       ├── River.js
│       ├── Rocks.js
│       └── Trees.js
├── App.js                # Root component
└── Experience.js         # Scene manager
```


## 🌈 Technical Highlights
- **React Three Fiber** for React-based 3D rendering
- **Cannon.js** for realistic Physics integration
- **GLSL** for the river and wave effects


## 📄 License
MIT License - Feel free to use and modify for personal/commercial projects


## 🙏 Acknowledgments
- Three.js and React Three Fiber teams
- Poimandres ecosystem contributors
- Poly pizza for free 3d models