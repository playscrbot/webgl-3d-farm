import { useRef } from "react";
import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

// 🎨 Water Shader with Realistic Flow & Color Sync
const WaterShader = shaderMaterial(
  {
    time: 0,
    deepWaterColor: new THREE.Color("#2a6f3a"),  // Dark greenish water
    shallowWaterColor: new THREE.Color("#6dc1a1"),  // Light green tint
    foamColor: new THREE.Color("#ffffff"),  // White foam
    transparency: 0.9,
    speed: 1.5,
    distortionStrength: 0.3,
    lightIntensity: 0.6,
    flowDirection: new THREE.Vector2(0.5, 1.0),
  },
  // Vertex Shader (Waves & UV Flow)
  `varying vec2 vUv;
   varying float vWave;
   uniform float time;
   uniform float distortionStrength;

   void main() {
      vUv = uv;
      vec3 pos = position;

      // 🌊 Riverbed (Waves on sync with each other)
      float wave1 = sin(uv.y * 100.0 + time * 4.0) * distortionStrength * 0.15;
      float wave2 = sin(uv.y * 50.0 + time * 2.0) * distortionStrength * 0.08;
      float wave3 = sin(uv.x * 30.0 + time * 4.5) * distortionStrength * 0.09;
      float wave4 = sin(uv.x * 20.0 + time * 3.0) * distortionStrength * 0.075;
      float wave5 = sin(uv.x * 10.0 + time * 1.5) * distortionStrength * 0.06;
      float wave6 = sin((uv.x + uv.y) * 60.0 + time * 4.5) * distortionStrength * 0.045;
      float wave7 = sin((uv.x + uv.y) * 30.0 + time * 1.5) * distortionStrength * 0.03;
      float wave8 = sin((uv.x + uv.y) * 15.0 + time * 0.5) * distortionStrength * 0.015;

      pos.z += wave1 + wave2 + wave3 + wave4 + wave5 + wave6 + wave7 + wave8; // 🏄 Combined for natural motion

      vWave = wave1 + wave2 + wave3;  // Store for foam & refraction
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
   }`,
  // Fragment Shader (Realistic Color & Flow)
  `uniform float time;
   uniform float speed;
   uniform float transparency;
   uniform float lightIntensity;
   uniform vec3 deepWaterColor;
   uniform vec3 shallowWaterColor;
   uniform vec3 foamColor;
   uniform vec2 flowDirection;

   varying vec2 vUv;
   varying float vWave;

   void main() {
      // 🎨 Depth-based Blending (Matching Base & Surface)
      float depthFactor = smoothstep(0.1, 0.9, vUv.y);
      vec3 waterColor = mix(shallowWaterColor, deepWaterColor, depthFactor);

      // 🔥 Water Flow Simulation with UV Distortion
      vec2 flowUV = vUv + flowDirection * time * speed * 0.005;
      float waveFactor = sin(flowUV.y * 20.0 + time * speed) * 0.1;

      // 💦 Moving Foam Effect
      float foam = smoothstep(0.7, 1.0, vUv.y) * smoothstep(0.6, 0.9, waveFactor);
      foam += step(0.92, waveFactor);  // Extra peaks

      vec3 finalColor = mix(waterColor, foamColor, foam * 0.3);

      // ✨ Improved Light Reflection (More Realism)
      float fresnel = pow(1.0 - dot(normalize(vec3(vUv, 1.0)), vec3(0.0, 0.0, 1.0)), 2.5);
      finalColor += vec3(lightIntensity * fresnel);

      // 🔮 Refraction Effect for Depth
      float refraction = sin(vWave * 6.0 + time * 1.8) * 0.03;
      finalColor.rgb += vec3(refraction);

      gl_FragColor = vec4(finalColor, transparency);
   }`
);

const WaterGradient = shaderMaterial(
  {
    colorStart: new THREE.Color("#6dc1a1"), // Light green
    colorEnd: new THREE.Color("#2a6f3a"),   // Dark green
    transparency: 0.8,
  },
  // Vertex Shader
  `varying vec2 vUv;
   
  void main() {
   vUv = uv;
   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,
  // Fragment Shader
  `varying vec2 vUv;
  uniform vec3 colorStart;
  uniform vec3 colorEnd;
  uniform float transparency;
  void main() {
    vec3 gradientColor = mix(colorStart, colorEnd, vUv.y);
    gl_FragColor = vec4(gradientColor, transparency);
  }`
);

extend({ WaterShader, WaterGradient });

function River() {
  const materialRef = useRef();

  // ✅ Ensure materials update over time
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <group>
      {/* 🌊 Realistic Water Surface with waves */}
      <mesh position={[35, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={10}>
        <planeGeometry args={[3, 10, 64, 64]} />
        <primitive object={new WaterShader()} ref={materialRef} />
      </mesh>

      {/* Riverbed underwater */}
      <mesh position={[35, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={10}>
        <planeGeometry args={[3, 10, 64, 64]} />
        <primitive object={new WaterGradient()} />
      </mesh>
    </group>
  );
}

export default River;