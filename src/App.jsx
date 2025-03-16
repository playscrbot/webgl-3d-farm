import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import { KeyboardControls } from "@react-three/drei";

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