import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  inject,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-background-avatar',
  standalone: true,
  template: `<div #container class="three-container"></div>`,
  styleUrl: './background-avatar.scss',
})
export class BackgroundAvatar implements AfterViewInit, OnDestroy {
  private readonly container = viewChild.required<ElementRef<HTMLDivElement>>('container');

  private readonly zone = inject(NgZone);
  private readonly platformId = inject(PLATFORM_ID);

  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;

  private particles?: THREE.Points;
  private particleGeometry?: THREE.BufferGeometry;
  private particleMaterial?: THREE.PointsMaterial;

  private lines?: THREE.LineSegments;
  private lineGeometry?: THREE.BufferGeometry;
  private lineMaterial?: THREE.LineBasicMaterial;

  private animationId = 0;
  private resizeObserver?: ResizeObserver;
  private lastFrameTime = 0;

  private positions = new Float32Array(0);
  private homePositions = new Float32Array(0);
  private velocities = new Float32Array(0);

  private readonly mouseWorld = new THREE.Vector2(1000, 1000);

  private targetCameraX = 0;
  private targetCameraY = 0;

  private readonly particleCount =
    typeof window !== 'undefined' && window.innerWidth < 768 ? 100 : 220;

  private readonly interactionRadius = 2.2;
  private readonly repelStrength = 0.075;
  private readonly springStrength = 0.012;
  private readonly damping = 0.92;
  private readonly connectionDistance = 2.2;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.zone.runOutsideAngular(() => this.init());
  }

  private init(): void {
    const element = this.container().nativeElement;

    if (!element.clientWidth || !element.clientHeight) return;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      60,
      element.clientWidth / element.clientHeight,
      0.1,
      100,
    );

    this.camera.position.z = 8;

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

    this.renderer.setSize(element.clientWidth, element.clientHeight);
    element.appendChild(this.renderer.domElement);

    this.addBackgroundObjects();

    window.addEventListener('pointermove', this.onPointerMove, {
      passive: true,
    });

    this.resizeObserver = new ResizeObserver(() => this.onResize());
    this.resizeObserver.observe(element);

    this.animate();
  }

  private addBackgroundObjects(): void {
    const count = this.particleCount;

    this.positions = new Float32Array(count * 3);
    this.homePositions = new Float32Array(count * 3);
    this.velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const k = i * 3;

      this.positions[k] = (Math.random() - 0.5) * 18;
      this.positions[k + 1] = (Math.random() - 0.5) * 10;
      this.positions[k + 2] = (Math.random() - 0.5) * 4;

      this.homePositions[k] = this.positions[k];
      this.homePositions[k + 1] = this.positions[k + 1];
      this.homePositions[k + 2] = this.positions[k + 2];

      this.velocities[k] = (Math.random() - 0.5) * 0.003;
      this.velocities[k + 1] = (Math.random() - 0.5) * 0.003;
      this.velocities[k + 2] = 0;
    }

    this.particleGeometry = new THREE.BufferGeometry();

    this.particleGeometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));

    this.particleMaterial = new THREE.PointsMaterial({
      color: 0x7dd3fc,
      size: 0.08,
      transparent: true,
      opacity: 1,
      sizeAttenuation: true,
      depthWrite: false,
    });

    this.particles = new THREE.Points(this.particleGeometry, this.particleMaterial);

    this.scene!.add(this.particles);

    // Maximum storage for all possible particle connections.
    this.lineGeometry = new THREE.BufferGeometry();

    this.lineGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(count * (count - 1) * 3), 3),
    );

    this.lineGeometry.setDrawRange(0, 0);

    this.lineMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
    });

    this.lines = new THREE.LineSegments(this.lineGeometry, this.lineMaterial);

    this.scene!.add(this.lines);
  }

  private onPointerMove = (event: PointerEvent): void => {
    const element = this.container().nativeElement;
    const rect = element.getBoundingClientRect();

    if (!rect.width || !rect.height) return;

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    // Match the particle field's coordinate range.
    this.mouseWorld.set((x - 0.5) * 18, -(y - 0.5) * 10);

    this.targetCameraX = (x - 0.5) * 0.35;
    this.targetCameraY = -(y - 0.5) * 0.25;
  };

  private animate = (time = 0): void => {
    this.animationId = requestAnimationFrame(this.animate);

    if (
      !this.renderer ||
      !this.scene ||
      !this.camera ||
      !this.particleGeometry ||
      !this.lineGeometry
    ) {
      return;
    }

    // Normalize movement so it behaves consistently across frame rates.
    const delta = this.lastFrameTime ? Math.min((time - this.lastFrameTime) / 16.667, 2) : 1;

    this.lastFrameTime = time;

    const count = this.particleCount;
    const radius = this.interactionRadius;
    const radiusSq = radius * radius;
    const connectionDistanceSq = this.connectionDistance * this.connectionDistance;

    // Move particles: mouse repulsion + spring return.
    for (let i = 0; i < count; i++) {
      const k = i * 3;

      const x = this.positions[k];
      const y = this.positions[k + 1];

      let ax = (this.homePositions[k] - x) * this.springStrength;

      let ay = (this.homePositions[k + 1] - y) * this.springStrength;

      const dx = x - this.mouseWorld.x;
      const dy = y - this.mouseWorld.y;
      const distanceSq = dx * dx + dy * dy;

      if (distanceSq < radiusSq && distanceSq > 0.0001) {
        const distance = Math.sqrt(distanceSq);
        const force = (1 - distance / radius) * this.repelStrength;

        ax += (dx / distance) * force;
        ay += (dy / distance) * force;
      }

      this.velocities[k] = (this.velocities[k] + ax * delta) * Math.pow(this.damping, delta);

      this.velocities[k + 1] =
        (this.velocities[k + 1] + ay * delta) * Math.pow(this.damping, delta);

      this.positions[k] += this.velocities[k] * delta;
      this.positions[k + 1] += this.velocities[k + 1] * delta;
    }

    this.particleGeometry.attributes['position'].needsUpdate = true;

    // Recalculate the web connections.
    const lineAttribute = this.lineGeometry.attributes['position'] as THREE.BufferAttribute;

    const linePositions = lineAttribute.array as Float32Array;
    let offset = 0;

    for (let i = 0; i < count; i++) {
      const a = i * 3;

      for (let j = i + 1; j < count; j++) {
        const b = j * 3;

        const dx = this.positions[a] - this.positions[b];
        const dy = this.positions[a + 1] - this.positions[b + 1];

        if (dx * dx + dy * dy < connectionDistanceSq) {
          linePositions[offset++] = this.positions[a];
          linePositions[offset++] = this.positions[a + 1];
          linePositions[offset++] = this.positions[a + 2];

          linePositions[offset++] = this.positions[b];
          linePositions[offset++] = this.positions[b + 1];
          linePositions[offset++] = this.positions[b + 2];
        }
      }
    }

    lineAttribute.needsUpdate = true;
    this.lineGeometry.setDrawRange(0, offset / 3);

    // Smooth camera parallax.
    this.camera.position.x += (this.targetCameraX - this.camera.position.x) * 0.025;

    this.camera.position.y += (this.targetCameraY - this.camera.position.y) * 0.025;

    this.renderer.render(this.scene, this.camera);
  };

  private onResize(): void {
    const element = this.container().nativeElement;

    if (!this.camera || !this.renderer) return;

    const width = element.clientWidth + 150;
    const height = element.clientHeight + 170;

    if (!width || !height) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);

    window.removeEventListener('pointermove', this.onPointerMove);
    this.resizeObserver?.disconnect();

    this.particleGeometry?.dispose();
    this.particleMaterial?.dispose();

    this.lineGeometry?.dispose();
    this.lineMaterial?.dispose();

    this.renderer?.dispose();
    this.renderer?.domElement.remove();

    this.scene?.clear();
  }
}
