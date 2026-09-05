"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import gsap from "gsap";

interface ArchitecturalCanvasProps {
  blueprintMode?: boolean;
  onAssemblyComplete?: () => void;
  scrollProgress?: number;
  className?: string;
}

export default function ArchitecturalCanvas({
  blueprintMode = false,
  onAssemblyComplete,
  scrollProgress = 0,
  className = "",
}: ArchitecturalCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const isInteractingRef = useRef(false);
  const previousPointerPositionRef = useRef({ x: 0, y: 0 });
  const orbitRotationRef = useRef({ x: 0.35, y: 0.75 });
  const targetRotationRef = useRef({ x: 0.35, y: 0.75 });
  const cameraBaseDistanceRef = useRef(38);
  const blueprintTransitionRef = useRef({ val: blueprintMode ? 1 : 0 });

  // References to animated elements
  const assemblyTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const animElementsRef = useRef<{
    grid?: THREE.GridHelper;
    particles?: THREE.Points;
    podium?: THREE.Mesh;
    core?: THREE.Mesh;
    columns: THREE.Mesh[];
    floors: {
      slab: THREE.Mesh;
      glass: THREE.Mesh;
      louvers: THREE.Group;
      interiorLight?: THREE.PointLight;
      targetY: number;
    }[];
    wireframeLines: THREE.LineSegments[];
    accentLights: THREE.Light[];
    pool?: THREE.Mesh;
  }>({
    columns: [],
    floors: [],
    wireframeLines: [],
    accentLights: [],
  });

  // Handle Blueprint Mode change
  useEffect(() => {
    gsap.to(blueprintTransitionRef.current, {
      val: blueprintMode ? 1 : 0,
      duration: 1.2,
      ease: "power2.inOut",
    });
  }, [blueprintMode]);

  // Main Three.js Setup & Animation Loop
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Atmosphere
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const bgDark = new THREE.Color(0x0a0c0e);
    const bgBlueprint = new THREE.Color(0x06111c);
    scene.background = bgDark.clone();
    scene.fog = new THREE.FogExp2(0x0a0c0e, 0.018);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 200);
    cameraRef.current = camera;
    camera.position.set(26, 18, 30);
    camera.lookAt(0, 6, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 4. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffaed, 2.2);
    sunLight.position.set(24, 40, 20);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x8ab4f8, 1.2);
    rimLight.position.set(-20, 25, -20);
    scene.add(rimLight);

    const groundBounceLight = new THREE.DirectionalLight(0xc5a880, 0.6);
    groundBounceLight.position.set(0, -10, 10);
    scene.add(groundBounceLight);

    // 5. Materials
    const concreteMaterial = new THREE.MeshStandardMaterial({
      color: 0x22252a,
      roughness: 0.85,
      metalness: 0.1,
    });

    const darkPodiumMaterial = new THREE.MeshStandardMaterial({
      color: 0x121518,
      roughness: 0.9,
      metalness: 0.2,
    });

    const bronzeTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0xc5a880,
      roughness: 0.35,
      metalness: 0.75,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd8e6f3,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.6,
      ior: 1.5,
    });

    const poolMaterial = new THREE.MeshStandardMaterial({
      color: 0x0e2433,
      roughness: 0.15,
      metalness: 0.8,
    });

    const wireframeLineMaterial = new THREE.LineBasicMaterial({
      color: 0xc5a880,
      transparent: true,
      opacity: 0,
      linewidth: 1,
    });

    // Helper to register wireframe lines
    const addWireframe = (mesh: THREE.Mesh, parent: THREE.Object3D = mesh) => {
      const edges = new THREE.EdgesGeometry(mesh.geometry, 25);
      const line = new THREE.LineSegments(edges, wireframeLineMaterial.clone());
      line.position.copy(mesh.position);
      line.rotation.copy(mesh.rotation);
      line.scale.copy(mesh.scale);
      parent.add(line);
      animElementsRef.current.wireframeLines.push(line);
      return line;
    };

    // 6. Ground Architectural Grid
    const grid = new THREE.GridHelper(60, 60, 0xc5a880, 0x1c2229);
    grid.position.y = 0;
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0;
    scene.add(grid);
    animElementsRef.current.grid = grid;

    // 7. Atmospheric Floating Particles
    const particleCount = 350;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 60;
      particlePositions[i + 1] = Math.random() * 32;
      particlePositions[i + 2] = (Math.random() - 0.5) * 60;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xc5a880,
      size: 0.14,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    animElementsRef.current.particles = particles;

    // 8. Architectural Podium & Foundation
    const podiumGeo = new THREE.BoxGeometry(24, 1.0, 24);
    const podium = new THREE.Mesh(podiumGeo, darkPodiumMaterial);
    podium.position.set(0, -5, 0); // starts lowered
    scene.add(podium);
    addWireframe(podium);
    animElementsRef.current.podium = podium;

    // Reflecting Pool on Ground Plinth
    const poolGeo = new THREE.BoxGeometry(8, 0.2, 14);
    const pool = new THREE.Mesh(poolGeo, poolMaterial);
    pool.position.set(11, 0.45, 0);
    scene.add(pool);
    animElementsRef.current.pool = pool;

    // Central Structural Core (Elevator Shaft / Shear Walls)
    const coreGeo = new THREE.BoxGeometry(4.2, 22, 4.2);
    const core = new THREE.Mesh(coreGeo, concreteMaterial);
    core.position.set(0, -12, 0); // starts lowered
    scene.add(core);
    addWireframe(core);
    animElementsRef.current.core = core;

    // 9. Structural Perimeter Columns (Rising from Ground)
    const columnPositions = [
      [-7, 0, -7],
      [7, 0, -7],
      [-7, 0, 7],
      [7, 0, 7],
      [0, 0, -7],
      [0, 0, 7],
      [-7, 0, 0],
      [7, 0, 0],
    ];

    const columnGeo = new THREE.BoxGeometry(0.6, 21, 0.6);
    columnPositions.forEach(([cx, cy, cz]) => {
      const col = new THREE.Mesh(columnGeo, bronzeTrimMaterial);
      col.position.set(cx, 0, cz);
      col.scale.set(1, 0.001, 1); // starts flat
      scene.add(col);
      addWireframe(col);
      animElementsRef.current.columns.push(col);
    });

    // 10. Cantilevered Floors & Glass Volumes (Assembling Vertically)
    const floorConfigs = [
      { y: 1.8, width: 17, depth: 17, cantX: 0, cantZ: 0, height: 3.0 },
      { y: 5.2, width: 18, depth: 16, cantX: 0.8, cantZ: 0, height: 3.0 },
      { y: 8.6, width: 16, depth: 18, cantX: 0, cantZ: 0.8, height: 3.0 },
      { y: 12.0, width: 17.5, depth: 17.5, cantX: -0.6, cantZ: -0.4, height: 3.0 },
      { y: 15.4, width: 16, depth: 16, cantX: 0, cantZ: 0, height: 3.0 },
      { y: 18.8, width: 14, depth: 14, cantX: 0.5, cantZ: 0.5, height: 2.6, isPenthouse: true },
    ];

    floorConfigs.forEach((cfg, index) => {
      // Floor concrete slab
      const slabGeo = new THREE.BoxGeometry(cfg.width, 0.45, cfg.depth);
      const slab = new THREE.Mesh(slabGeo, concreteMaterial);
      slab.position.set(cfg.cantX, -10 - index * 3, cfg.cantZ);
      scene.add(slab);
      addWireframe(slab);

      // Glass enclosure
      const glassGeo = new THREE.BoxGeometry(cfg.width - 0.8, cfg.height - 0.5, cfg.depth - 0.8);
      const glass = new THREE.Mesh(glassGeo, glassMaterial);
      glass.position.set(cfg.cantX, -10 - index * 3 + (cfg.height - 0.5) / 2, cfg.cantZ);
      (glass.material as THREE.Material).opacity = 0;
      scene.add(glass);

      // Architectural Louvers & Bronze Fins
      const louversGroup = new THREE.Group();
      louversGroup.position.set(cfg.cantX, -10 - index * 3, cfg.cantZ);
      const finCount = 6;
      const finGeo = new THREE.BoxGeometry(0.12, cfg.height * 0.9, 0.45);
      for (let f = 0; f < finCount; f++) {
        const fin = new THREE.Mesh(finGeo, bronzeTrimMaterial);
        fin.position.set(-cfg.width / 2 + 1.5 + f * (cfg.width / (finCount + 1)), cfg.height / 2, cfg.depth / 2 + 0.1);
        louversGroup.add(fin);
        addWireframe(fin, louversGroup);
      }
      scene.add(louversGroup);

      // Warm Interior Ambient Glow PointLight
      const interiorLight = new THREE.PointLight(0xffb766, 0, 14, 2);
      interiorLight.position.set(cfg.cantX, cfg.y + 1.2, cfg.cantZ);
      scene.add(interiorLight);

      animElementsRef.current.floors.push({
        slab,
        glass,
        louvers: louversGroup,
        interiorLight,
        targetY: cfg.y,
      });
    });

    // 11. Roof Crown Pergola
    const crownGeo = new THREE.BoxGeometry(14.8, 0.25, 14.8);
    const crown = new THREE.Mesh(crownGeo, bronzeTrimMaterial);
    crown.position.set(0.5, 21.6, 0.5);
    crown.scale.set(0.001, 1, 0.001);
    scene.add(crown);
    addWireframe(crown);

    // 12. CHOREOGRAPHED CONSTRUCTION / ASSEMBLY TIMELINE
    const tl = gsap.timeline({
      onComplete: () => {
        if (onAssemblyComplete) onAssemblyComplete();
      },
    });
    assemblyTimelineRef.current = tl;

    // 0.0s - 0.6s: Atmosphere, Particles & Architectural Grid
    tl.to(particleMat, { opacity: 0.65, duration: 1.2, ease: "power2.out" }, 0.1);
    tl.to((grid.material as THREE.Material), { opacity: 0.35, duration: 1.4, ease: "power2.out" }, 0.4);

    // 0.8s - 1.8s: Ground Plinth & Core Rise
    tl.to(podium.position, { y: 0.5, duration: 1.2, ease: "back.out(1.1)" }, 0.7);
    tl.to(core.position, { y: 11, duration: 1.6, ease: "power3.out" }, 1.0);

    // 1.4s - 2.6s: Structural Columns Grow Vertically
    animElementsRef.current.columns.forEach((col, idx) => {
      tl.to(
        col.scale,
        { y: 1, duration: 1.2, ease: "power2.out" },
        1.3 + idx * 0.08
      );
      tl.to(
        col.position,
        { y: 10.5, duration: 1.2, ease: "power2.out" },
        1.3 + idx * 0.08
      );
    });

    // 2.2s - 4.2s: Staggered Cantilevered Floors Ascend and Assemble
    animElementsRef.current.floors.forEach((f, idx) => {
      const delay = 2.0 + idx * 0.28;
      // Slab rising into slot
      tl.to(f.slab.position, { y: f.targetY, duration: 0.9, ease: "back.out(1.2)" }, delay);
      // Louvers following slab
      tl.to(f.louvers.position, { y: f.targetY, duration: 0.9, ease: "back.out(1.2)" }, delay);
      // Glass enclosure expanding and fading in
      tl.to(
        f.glass.position,
        { y: f.targetY + 1.25, duration: 0.8, ease: "power2.out" },
        delay + 0.15
      );
      tl.to(
        (f.glass.material as THREE.Material),
        { opacity: 0.38, duration: 0.8, ease: "power1.inOut" },
        delay + 0.2
      );
      // Interior architectural illumination activates
      if (f.interiorLight) {
        tl.to(f.interiorLight, { intensity: 1.8, duration: 1.0, ease: "power2.in" }, delay + 0.4);
      }
    });

    // 3.8s - 4.5s: Roof Pergola Crown Deploy
    tl.to(crown.scale, { x: 1, z: 1, duration: 0.9, ease: "back.out(1.4)" }, 3.6);

    // Wireframe Blueprint Mode Subtle Pulse
    animElementsRef.current.wireframeLines.forEach((line) => {
      tl.to((line.material as THREE.LineBasicMaterial), { opacity: 0.2, duration: 0.8 }, 2.5);
      tl.to((line.material as THREE.LineBasicMaterial), { opacity: 0.05, duration: 1.2 }, 3.5);
    });

    // Camera Opening Cinematic Sweep
    tl.fromTo(
      camera.position,
      { x: 34, y: 30, z: 42 },
      { x: 26, y: 18, z: 30, duration: 4.8, ease: "power3.out" },
      0
    );

    // 13. Interaction Listeners (Desktop Orbit & Touch Parallax)
    const handlePointerDown = (e: PointerEvent) => {
      isInteractingRef.current = true;
      previousPointerPositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (isInteractingRef.current) {
        const deltaX = e.clientX - previousPointerPositionRef.current.x;
        const deltaY = e.clientY - previousPointerPositionRef.current.y;
        previousPointerPositionRef.current = { x: e.clientX, y: e.clientY };

        targetRotationRef.current.y += deltaX * 0.005;
        targetRotationRef.current.x = Math.max(
          0.05,
          Math.min(1.1, targetRotationRef.current.x + deltaY * 0.005)
        );
      } else {
        // Subtle ambient cursor tracking
        const nx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;
        targetRotationRef.current.y = 0.75 + nx * 0.15;
        targetRotationRef.current.x = 0.35 + ny * 0.08;
      }
    };

    const handlePointerUp = () => {
      isInteractingRef.current = false;
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 14. Animation & Render Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth Orbit Damping
      orbitRotationRef.current.x += (targetRotationRef.current.x - orbitRotationRef.current.x) * 0.05;
      orbitRotationRef.current.y += (targetRotationRef.current.y - orbitRotationRef.current.y) * 0.05;

      // Scroll-driven camera dolly influence
      const scrollDolly = scrollProgress * 14;
      const effectiveDistance = Math.max(16, cameraBaseDistanceRef.current - scrollDolly);

      const radius = effectiveDistance;
      const pitch = orbitRotationRef.current.x;
      const yaw = orbitRotationRef.current.y + time * 0.02; // very subtle architectural cinematic drift

      camera.position.x = radius * Math.cos(pitch) * Math.sin(yaw);
      camera.position.y = radius * Math.sin(pitch) + 4 - scrollProgress * 2;
      camera.position.z = radius * Math.cos(pitch) * Math.cos(yaw);
      camera.lookAt(0, 8 + scrollProgress * 2, 0);

      // Particle subtle elevation animation
      if (particles) {
        const positions = particles.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += delta * 0.6;
          if (positions[i] > 35) positions[i] = 0;
        }
        particles.geometry.attributes.position.needsUpdate = true;
      }

      // Blueprint Mode Material Interpolation
      const bpVal = blueprintTransitionRef.current.val;
      scene.background = bgDark.clone().lerp(bgBlueprint, bpVal);
      if (scene.fog) {
        (scene.fog as THREE.FogExp2).color.copy(scene.background as THREE.Color);
      }

      // Wireframe glow in blueprint mode
      animElementsRef.current.wireframeLines.forEach((line) => {
        const mat = line.material as THREE.LineBasicMaterial;
        mat.opacity = THREE.MathUtils.lerp(0.06, 0.85, bpVal);
        if (bpVal > 0.5) {
          mat.color.setHex(0x56ccf2); // luminous cyan in blueprint mode
        } else {
          mat.color.setHex(0xc5a880); // architectural bronze
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // 15. Clean Resource Disposal
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("resize", handleResize);

      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (assemblyTimelineRef.current) assemblyTimelineRef.current.kill();

      renderer.dispose();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).geometry) {
          (obj as THREE.Mesh).geometry.dispose();
        }
        if ((obj as THREE.Mesh).material) {
          const mat = (obj as THREE.Mesh).material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat.dispose();
        }
      });
    };
  }, [onAssemblyComplete]);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none overflow-hidden ${className}`}
      data-cursor="3d"
      aria-label="Interactive 3D Architectural Visualization"
    />
  );
}
