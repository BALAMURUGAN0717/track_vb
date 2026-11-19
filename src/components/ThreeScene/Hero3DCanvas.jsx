import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

export default function Hero3DCanvas() {
  const containerRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Dynamic Lights based on Theme
    const ambientLight = new THREE.AmbientLight(isDark ? 0x223366 : 0x88aaff, isDark ? 1.4 : 1.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x4F8CFF, 2.5);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x8B5CF6, 2.0);
    dirLight2.position.set(-5, -3, 3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x38BDF8, 3, 15);
    pointLight.position.set(0, 2, 3);
    scene.add(pointLight);

    // Central Futuristic 3D Object Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Icosahedron Jewel (Holographic glass feel)
    const jewelGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const jewelMat = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0x4F8CFF : 0x3B82F6,
      emissive: isDark ? 0x1A2A6C : 0x2563EB,
      emissiveIntensity: 0.35,
      roughness: 0.15,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
      transparent: true,
      opacity: 0.92
    });
    const jewelMesh = new THREE.Mesh(jewelGeo, jewelMat);
    mainGroup.add(jewelMesh);

    // Wireframe cage surrounding the core
    const wireGeo = new THREE.IcosahedronGeometry(1.95, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x8B5CF6 : 0x6366F1,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    mainGroup.add(wireMesh);

    // 2. Futuristic Torus Orbit Ring
    const torusGeo = new THREE.TorusGeometry(2.7, 0.05, 16, 100);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x38BDF8,
      emissive: 0x0284C7,
      emissiveIntensity: 0.8,
      metalness: 0.9,
      roughness: 0.1
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.rotation.x = Math.PI / 3;
    mainGroup.add(torusMesh);

    // Second inclined Orbit Ring
    const torus2Geo = new THREE.TorusGeometry(3.1, 0.04, 16, 100);
    const torus2Mat = new THREE.MeshStandardMaterial({
      color: 0x8B5CF6,
      emissive: 0x7C3AED,
      emissiveIntensity: 0.6,
      metalness: 0.9,
      roughness: 0.2
    });
    const torus2Mesh = new THREE.Mesh(torus2Geo, torus2Mat);
    torus2Mesh.rotation.x = -Math.PI / 4;
    torus2Mesh.rotation.y = Math.PI / 6;
    mainGroup.add(torus2Mesh);

    // 3. Floating Mini Career Cubes / Holograms around core
    const floatingObjects = [];
    const cubeGeo = new THREE.BoxGeometry(0.35, 0.35, 0.35);
    const sphereGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const octaGeo = new THREE.OctahedronGeometry(0.28);

    const geometries = [cubeGeo, sphereGeo, octaGeo];
    const colors = [0x4F8CFF, 0x8B5CF6, 0x10B981, 0xF59E0B, 0x06B6D4];

    for (let i = 0; i < 14; i++) {
      const g = geometries[i % geometries.length];
      const mat = new THREE.MeshStandardMaterial({
        color: colors[i % colors.length],
        metalness: 0.7,
        roughness: 0.2,
        emissive: colors[i % colors.length],
        emissiveIntensity: 0.4
      });
      const mesh = new THREE.Mesh(g, mat);

      const radius = 2.4 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      mesh.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );

      mesh.userData = {
        speedX: (Math.random() - 0.5) * 0.02,
        speedY: (Math.random() - 0.5) * 0.02,
        speedZ: (Math.random() - 0.5) * 0.02,
        radius,
        theta,
        speedOrb: 0.005 + Math.random() * 0.01
      };

      mainGroup.add(mesh);
      floatingObjects.push(mesh);
    }

    // 4. Background Particle Constellation
    const particleCount = 140;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 14;
      particlePositions[i + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: isDark ? 0x818CF8 : 0x4F8CFF,
      size: 0.06,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Interaction parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 1.2;
      targetY = y * 1.2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera / group rotation following mouse
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      mainGroup.rotation.y = elapsedTime * 0.35 + mouseX * 0.8;
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.15 + mouseY * 0.6;
      mainGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.15;

      wireMesh.rotation.y = -elapsedTime * 0.25;
      wireMesh.rotation.x = elapsedTime * 0.15;

      torusMesh.rotation.z = elapsedTime * 0.4;
      torus2Mesh.rotation.z = -elapsedTime * 0.3;

      // Rotate small floating items
      floatingObjects.forEach((obj) => {
        obj.rotation.x += obj.userData.speedX;
        obj.rotation.y += obj.userData.speedY;
        obj.rotation.z += obj.userData.speedZ;
        obj.userData.theta += obj.userData.speedOrb;

        // gentle orbital float
        obj.position.x = Math.cos(obj.userData.theta) * obj.userData.radius;
        obj.position.z = Math.sin(obj.userData.theta) * obj.userData.radius;
      });

      // Slowly rotate particles
      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      jewelGeo.dispose();
      jewelMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      torus2Geo.dispose();
      torus2Mat.dispose();
      cubeGeo.dispose();
      sphereGeo.dispose();
      octaGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (container && renderer.domElement) {
        container.innerHTML = '';
      }
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '420px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'grab'
      }}
    />
  );
}
