'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import countries from '@/data/globe.json';

export type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

export interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

export function World({ globeConfig, data }: WorldProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 10, 2000);
    camera.position.set(0, 0, 320);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(globeConfig.ambientLight || '#38bdf8', 0.8);
    scene.add(ambientLight);

    const dirLightLeft = new THREE.DirectionalLight(globeConfig.directionalLeftLight || '#ffffff', 1.2);
    dirLightLeft.position.set(-400, 200, 400);
    scene.add(dirLightLeft);

    const dirLightTop = new THREE.DirectionalLight(globeConfig.directionalTopLight || '#ffffff', 1);
    dirLightTop.position.set(-200, 500, 200);
    scene.add(dirLightTop);

    // 3. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = globeConfig.autoRotate ?? true;
    controls.autoRotateSpeed = globeConfig.autoRotateSpeed ?? 0.6;
    controls.minPolarAngle = Math.PI / 3.5;
    controls.maxPolarAngle = Math.PI - Math.PI / 3;

    // 4. ThreeGlobe Setup
    const globe = new ThreeGlobe();

    const globeMaterial = globe.globeMaterial() as unknown as {
      color: THREE.Color;
      emissive: THREE.Color;
      emissiveIntensity: number;
      shininess: number;
    };
    if (globeMaterial) {
      globeMaterial.color = new THREE.Color(globeConfig.globeColor || '#09090b');
      globeMaterial.emissive = new THREE.Color(globeConfig.emissive || '#09090b');
      globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity ?? 0.15;
      globeMaterial.shininess = globeConfig.shininess ?? 0.9;
    }

    globe
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(globeConfig.showAtmosphere ?? true)
      .atmosphereColor(globeConfig.atmosphereColor || '#6366f1')
      .atmosphereAltitude(globeConfig.atmosphereAltitude ?? 0.12)
      .hexPolygonColor(() => globeConfig.polygonColor || 'rgba(255, 255, 255, 0.45)');

    if (data && data.length > 0) {
      globe
        .arcsData(data)
        .arcStartLat((d: any) => d.startLat)
        .arcStartLng((d: any) => d.startLng)
        .arcEndLat((d: any) => d.endLat)
        .arcEndLng((d: any) => d.endLng)
        .arcColor((d: any) => d.color)
        .arcAltitude((d: any) => d.arcAlt)
        .arcStroke(() => 0.3)
        .arcDashLength(globeConfig.arcLength ?? 0.7)
        .arcDashInitialGap((d: any) => (d.order || 0) * 0.4)
        .arcDashGap(2)
        .arcDashAnimateTime(() => globeConfig.arcTime ?? 1600);

      const points: any[] = [];
      data.forEach((arc) => {
        points.push({ lat: arc.startLat, lng: arc.startLng, color: arc.color });
        points.push({ lat: arc.endLat, lng: arc.endLng, color: arc.color });
      });

      globe
        .pointsData(points)
        .pointColor((p: any) => p.color)
        .pointsMerge(true)
        .pointAltitude(0.0)
        .pointRadius(2);
    }

    scene.add(globe);

    // Initial position orientation
    if (globeConfig.initialPosition) {
      const phi = (90 - globeConfig.initialPosition.lat) * (Math.PI / 180);
      const theta = (globeConfig.initialPosition.lng + 180) * (Math.PI / 180);
      globe.rotation.y = -theta;
      globe.rotation.x = phi - Math.PI / 2;
    }

    // 5. Animation loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 6. Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 300;
      const h = container.clientHeight || 300;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [globeConfig, data]);

  return <div ref={containerRef} className="w-full h-full relative" />;
}
