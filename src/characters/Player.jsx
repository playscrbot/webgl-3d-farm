import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useState, useEffect } from "react";
import { useGLTF, useAnimations, useKeyboardControls } from "@react-three/drei";

useGLTF.preload("../../public/models/player/character.glb");

const WALK_SPEED = 0.05;
const RUN_SPEED = 0.1;
const ROTATION_SMOOTHNESS = 0.1;
const CAMERA_OFFSET = new THREE.Vector3(0, 4, 12);

const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const direction = new THREE.Vector3();
const movement = new THREE.Vector3();

export default function Player() {
  const group = useRef();
  const { scene, animations } = useGLTF("../../public/models/player/character.glb");
  const { actions, names } = useAnimations(animations, group);

  const [currentAction, setCurrentAction] = useState(null);
  
  // Get keyboard controls
  const [, get] = useKeyboardControls();

  useEffect(() => {
    return () => {
      if (currentAction && actions[currentAction]) {
        actions[currentAction].fadeOut(0.3);
      }
    };
  }, [currentAction, actions]);

  useFrame(({ camera }) => {
    if (!group.current) return;

    const { forward, backward, left, right } = get();
    const isMoving = forward || backward || left || right;

    // Compute movement direction using front and side vectors
    frontVector.set(0, 0, backward - forward);
    sideVector.set(left - right, 0, 0);
    direction.subVectors(frontVector, sideVector).normalize();

    if (isMoving) {
      const isRunning = forward || left || right;
      const speed = isRunning ? RUN_SPEED : WALK_SPEED;

      // Apply movement
      movement.copy(direction).multiplyScalar(speed);
      group.current.position.add(movement);

      // Rotate towards movement direction
      if (direction.length() > 0) {
        const targetRotation = Math.atan2(direction.x, direction.z);
        group.current.rotation.y += (targetRotation - group.current.rotation.y) * ROTATION_SMOOTHNESS;
      }

      // Determine animation
      let newAction = names[16]; // Run by default
      if (!isRunning) newAction = names[22]; // Walk if not running

      if (newAction !== currentAction) {
        if (currentAction && actions[currentAction]) actions[currentAction].fadeOut(0.3);
        actions[newAction]?.reset().fadeIn(0.3).play();
        setCurrentAction(newAction);
      }
    } else {
      // Stop animations when no movement
      if (currentAction && actions[currentAction]) {
        actions[currentAction].fadeOut(0.3);
        setCurrentAction(null);
      }
    }

    // 📌 Update the third-person camera position
    const playerPos = group.current.position;
    const cameraTarget = new THREE.Vector3().copy(playerPos).add(CAMERA_OFFSET);

    camera.position.lerp(cameraTarget, 0.1); // Smoothly move the camera
    camera.lookAt(playerPos); // Ensure the camera looks at the player
  });

  return <primitive ref={group} object={scene} rotation={[0, Math.PI, 0]} />;
}