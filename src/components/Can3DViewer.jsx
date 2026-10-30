import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * 3D Can Viewer built with Three.js
 * Features:
 * - Dynamic procedural aluminum can geometry with lip, shoulder, lid, and pull tab
 * - Realistic metallic shader with bump-mapped condensation droplets
 * - Procedural dynamic canvas texture displaying VOLTIX branding
 * - Orbiting energy particles and volumetric neon spotlights
 * - Interactive mouse rotation with damping + smooth auto-spin
 * - Dynamic flavor accent switching
 */
export default function Can3DViewer({ flavor = 'original', className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    let width = container.clientWidth || 400;
    let height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Color palette based on flavor
    const flavorColors = {
      original: {
        primary: 0xc7ff00,
        glow: 0x39ff14,
        text: '#C7FF00',
        name: 'ORIGINAL',
        subtext: 'ULTRA ELECTRIFIED',
      },
      berry: {
        primary: 0xa855f7,
        glow: 0xc084fc,
        text: '#A855F7',
        name: 'BERRY BLAST',
        subtext: 'PURPLE SURGE',
      },
      citrus: {
        primary: 0xf97316,
        glow: 0xfb923c,
        text: '#F97316',
        name: 'CITRUS RUSH',
        subtext: 'SOLAR CHARGE',
      },
    };

    const currentTheme = flavorColors[flavor] || flavorColors.original;

    // 1. Procedural Label Canvas Texture
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 1024;
    labelCanvas.height = 1024;
    const ctx = labelCanvas.getContext('2d');

    // Draw Can Graphic
    const drawLabel = (theme) => {
      // Matte dark charcoal / black body
      ctx.fillStyle = '#0a0a0c';
      ctx.fillRect(0, 0, 1024, 1024);

      // Carbon texture / grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 1024; i += 32) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 1024);
        ctx.stroke();
      }

      // Dynamic Angular Energy Stripe
      ctx.fillStyle = theme.text;
      ctx.beginPath();
      ctx.moveTo(0, 200);
      ctx.lineTo(1024, 400);
      ctx.lineTo(1024, 460);
      ctx.lineTo(0, 260);
      ctx.closePath();
      ctx.fill();

      // Secondary Neon Slash
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.beginPath();
      ctx.moveTo(0, 680);
      ctx.lineTo(1024, 880);
      ctx.lineTo(1024, 910);
      ctx.lineTo(0, 710);
      ctx.closePath();
      ctx.fill();

      // Top Icon Badge
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 32px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⚡ 500ML // ZERO SUGAR', 512, 160);

      // Main Brand Name
      ctx.font = '900 130px "Syne", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = theme.text;
      ctx.shadowBlur = 24;
      ctx.fillText('VOLTIX', 512, 530);
      ctx.shadowBlur = 0; // reset

      // Subheading Flavor
      ctx.font = 'bold 44px "Space Grotesk", sans-serif';
      ctx.fillStyle = theme.text;
      ctx.fillText(theme.name, 512, 600);

      ctx.font = '500 24px "JetBrains Mono", monospace';
      ctx.fillStyle = '#a3a3a3';
      ctx.fillText(theme.subtext, 512, 640);

      // Nutrition badge pills
      ctx.font = '600 20px "JetBrains Mono", monospace';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('180MG CAFFEINE • TAURINE • B-VITAMINS • ELECTROLYTES', 512, 800);

      // Barcode lines at bottom
      for (let x = 320; x < 700; x += 10 + Math.random() * 8) {
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fillRect(x, 890, 4, 40);
      }
    };

    drawLabel(currentTheme);

    // Bump texture for realistic water condensation
    const bumpCanvas = document.createElement('canvas');
    bumpCanvas.width = 512;
    bumpCanvas.height = 512;
    const bCtx = bumpCanvas.getContext('2d');
    bCtx.fillStyle = '#808080';
    bCtx.fillRect(0, 0, 512, 512);
    // Draw condensation droplets
    for (let i = 0; i < 400; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const r = 1 + Math.random() * 3.5;
      const grad = bCtx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.8, '#d0d0d0');
      grad.addColorStop(1, '#808080');
      bCtx.fillStyle = grad;
      bCtx.beginPath();
      bCtx.arc(x, y, r, 0, Math.PI * 2);
      bCtx.fill();
    }

    const labelTexture = new THREE.CanvasTexture(labelCanvas);
    const bumpTexture = new THREE.CanvasTexture(bumpCanvas);
    bumpTexture.wrapS = THREE.RepeatWrapping;
    bumpTexture.wrapT = THREE.RepeatWrapping;
    bumpTexture.repeat.set(3, 4);

    // 2. Can Group Construction
    const canGroup = new THREE.Group();

    // Aluminum Can Materials
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8d8d8,
      metalness: 0.95,
      roughness: 0.18,
      envMapIntensity: 1.0,
    });

    const bodyMaterial = new THREE.MeshStandardMaterial({
      map: labelTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.04,
      metalness: 0.55,
      roughness: 0.28,
    });

    // Main Cylinder Body (height 3.2, radius 1.0)
    const bodyGeometry = new THREE.CylinderGeometry(1.0, 1.0, 2.7, 64, 1, true);
    const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
    canGroup.add(bodyMesh);

    // Top Shoulder & Rim
    const topTaperGeo = new THREE.CylinderGeometry(0.88, 1.0, 0.25, 64);
    topTaperGeo.translate(0, 1.475, 0);
    const topTaper = new THREE.Mesh(topTaperGeo, metalMaterial);
    canGroup.add(topTaper);

    const topRimGeo = new THREE.TorusGeometry(0.88, 0.045, 16, 64);
    topRimGeo.rotation.x = Math.PI / 2;
    topRimGeo.translate(0, 1.6, 0);
    const topRim = new THREE.Mesh(topRimGeo, metalMaterial);
    canGroup.add(topRim);

    // Top Lid Recess
    const lidGeo = new THREE.CircleGeometry(0.87, 48);
    lidGeo.rotation.x = -Math.PI / 2;
    lidGeo.translate(0, 1.58, 0);
    const lid = new THREE.Mesh(lidGeo, metalMaterial);
    canGroup.add(lid);

    // Pull Tab
    const tabShape = new THREE.Shape();
    tabShape.moveTo(-0.15, -0.3);
    tabShape.lineTo(0.15, -0.3);
    tabShape.lineTo(0.15, 0.3);
    tabShape.lineTo(-0.15, 0.3);
    tabShape.closePath();
    const tabExtrudeSettings = { depth: 0.02, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.01, bevelThickness: 0.01 };
    const tabGeo = new THREE.ExtrudeGeometry(tabShape, tabExtrudeSettings);
    tabGeo.rotation.x = -Math.PI / 2;
    tabGeo.translate(0, 1.61, 0.1);
    const tab = new THREE.Mesh(tabGeo, metalMaterial);
    canGroup.add(tab);

    // Bottom Taper & Rim
    const bottomTaperGeo = new THREE.CylinderGeometry(1.0, 0.88, 0.25, 64);
    bottomTaperGeo.translate(0, -1.475, 0);
    const bottomTaper = new THREE.Mesh(bottomTaperGeo, metalMaterial);
    canGroup.add(bottomTaper);

    const bottomCapGeo = new THREE.CircleGeometry(0.88, 48);
    bottomCapGeo.rotation.x = Math.PI / 2;
    bottomCapGeo.translate(0, -1.6, 0);
    const bottomCap = new THREE.Mesh(bottomCapGeo, metalMaterial);
    canGroup.add(bottomCap);

    scene.add(canGroup);

    // 3. Floating Spark Particles (Zero gravity energy dust)
    const particleCount = 140;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.4 + Math.random() * 2.5;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 6;

      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;

      particleSpeeds.push({
        angleSpeed: 0.005 + Math.random() * 0.015,
        yVelocity: 0.008 + Math.random() * 0.012,
        radius: radius,
        angle: angle,
      });
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: currentTheme.primary,
      size: 0.065,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Key Light (Crisp White Rim)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(5, 4, 5);
    scene.add(keyLight);

    // Neon Rim Light (Flavor Accentuated)
    const neonRimLight = new THREE.PointLight(currentTheme.primary, 4.5, 12);
    neonRimLight.position.set(-4, 1, 2);
    scene.add(neonRimLight);

    // Fill Light (Secondary Glow)
    const fillLight = new THREE.PointLight(currentTheme.glow, 2.5, 10);
    fillLight.position.set(3, -2, -3);
    scene.add(fillLight);

    // 5. Mouse Interaction & Animation Loop
    let targetRotationY = -0.3;
    let targetRotationX = 0.1;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.005;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      } else {
        // Subtle perspective tracking based on mouse position in viewport
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        targetRotationX = y * 0.35 + 0.1;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Render Loop
    let clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth auto rotation when not dragging
      if (!isDragging) {
        targetRotationY += 0.007;
      }

      // Smooth Lerp Damping
      canGroup.rotation.y += (targetRotationY - canGroup.rotation.y) * 0.08;
      canGroup.rotation.x += (targetRotationX - canGroup.rotation.x) * 0.08;

      // Slight breathing float on Y
      canGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08;

      // Update energy particles
      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const p = particleSpeeds[i];
        p.angle += p.angleSpeed;
        positions[i * 3] = Math.cos(p.angle) * p.radius;
        positions[i * 3 + 2] = Math.sin(p.angle) * p.radius;

        // Rise and wrap around
        positions[i * 3 + 1] += p.yVelocity;
        if (positions[i * 3 + 1] > 3) {
          positions[i * 3 + 1] = -3;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      renderer.dispose();
      bodyGeometry.dispose();
      metalMaterial.dispose();
      bodyMaterial.dispose();
      labelTexture.dispose();
      bumpTexture.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [flavor]);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-label="Interactive 3D VOLTIX Energy Drink Can - Click and drag to rotate"
      role="img"
    />
  );
}
