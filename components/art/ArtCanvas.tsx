import React, { useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════════════════
   ART CANVAS — wireframe 3D artifacts on the void
   ───────────────────────────────────────────────────────────────────────
   Each <ArtCanvas artifact="…"> renders one holographic engineering model
   (icosahedron, torus-knot circuit, gyroscope rings, particle field) as
   thin TSA-blue/white wireframes. Constraints, in order of importance:

   · three.js is dynamically imported — it never lands in the entry chunk.
   · Hard budget of 2 live WebGL contexts; extra mounts stay empty.
   · Renders only while on-screen (IntersectionObserver) and only re-renders
     while animating; devicePixelRatio capped at 1.5.
   · Tumbles with time and leans toward the pointer (same normalized cursor
     the parallax engine uses).
   · prefers-reduced-motion → renders exactly one static frame.
   ═══════════════════════════════════════════════════════════════════════ */

export type Artifact = 'icosa' | 'torus' | 'gyro' | 'field';

const MAX_CONTEXTS = 2;
let liveContexts = 0;

/* spectral studio palette — saturated mid-tones that read on void AND paper */
const BLUE = 0x3b9eff;
const MAGENTA = 0xe93d82;
const AMBER = 0xffb224;
const VIOLET = 0x8250ff;

type Three = typeof import('three');

function buildScene(THREE: Three, artifact: Artifact) {
  const scene = new THREE.Scene();
  const group = new THREE.Group();
  scene.add(group);

  const line = (geo: InstanceType<Three['BufferGeometry']>, color: number, opacity: number) =>
    new THREE.LineSegments(
      new THREE.EdgesGeometry(geo as any),
      new THREE.LineBasicMaterial({ color, transparent: true, opacity })
    );

  if (artifact === 'icosa') {
    group.add(line(new THREE.IcosahedronGeometry(1.35, 0), BLUE, 0.95));
    group.add(line(new THREE.IcosahedronGeometry(0.72, 1), VIOLET, 0.5));
    const pts = new THREE.Points(
      new THREE.IcosahedronGeometry(1.35, 2),
      new THREE.PointsMaterial({ color: MAGENTA, size: 0.02, transparent: true, opacity: 0.85 })
    );
    group.add(pts);
  } else if (artifact === 'torus') {
    group.add(line(new THREE.TorusKnotGeometry(0.95, 0.28, 96, 10, 2, 3), MAGENTA, 0.6));
    group.add(line(new THREE.TorusGeometry(1.5, 0.02, 4, 64), AMBER, 0.5));
  } else if (artifact === 'gyro') {
    const ringColors = [BLUE, MAGENTA, AMBER];
    for (let i = 0; i < 3; i++) {
      const ring = line(new THREE.TorusGeometry(1.5 - i * 0.38, 0.015, 4, 96), ringColors[i], 0.8 - i * 0.1);
      ring.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      group.add(ring);
    }
    group.add(line(new THREE.OctahedronGeometry(0.4, 0), VIOLET, 0.9));
  } else {
    // field — drifting particle lattice, two interleaved hues
    const N = 900;
    const geoA = new THREE.BufferGeometry();
    const geoB = new THREE.BufferGeometry();
    const posA = new Float32Array((N / 2) * 3);
    const posB = new Float32Array((N / 2) * 3);
    for (let i = 0; i < (N / 2) * 3; i++) {
      posA[i] = (Math.random() - 0.5) * 5;
      posB[i] = (Math.random() - 0.5) * 5;
    }
    geoA.setAttribute('position', new THREE.BufferAttribute(posA, 3));
    geoB.setAttribute('position', new THREE.BufferAttribute(posB, 3));
    group.add(new THREE.Points(geoA, new THREE.PointsMaterial({ color: MAGENTA, size: 0.022, transparent: true, opacity: 0.85 })));
    group.add(new THREE.Points(geoB, new THREE.PointsMaterial({ color: BLUE, size: 0.022, transparent: true, opacity: 0.85 })));
    group.add(line(new THREE.BoxGeometry(3.4, 3.4, 3.4), AMBER, 0.3));
  }

  const dispose = () => {
    group.traverse(obj => {
      const o = obj as any;
      o.geometry?.dispose?.();
      o.material?.dispose?.();
    });
  };

  const update = (t: number, mx: number, my: number) => {
    group.rotation.y = t * 0.12 + mx * 0.45;
    group.rotation.x = Math.sin(t * 0.07) * 0.25 - my * 0.35;
    if (artifact === 'gyro') {
      group.children.forEach((c, i) => {
        c.rotation.x += 0.0012 * (i + 1);
        c.rotation.y += 0.0009 * (i + 1);
      });
    }
    if (artifact === 'field') group.rotation.z = t * 0.03;
  };

  return { scene, update, dispose };
}

interface ArtCanvasProps {
  artifact: Artifact;
  className?: string;
  style?: React.CSSProperties;
  /** camera distance — smaller = larger artifact */
  zoom?: number;
  opacity?: number;
}

export const ArtCanvas: React.FC<ArtCanvasProps> = ({
  artifact, className, style, zoom = 4, opacity = 1,
}) => {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof window === 'undefined') return;
    if (liveContexts >= MAX_CONTEXTS) return;
    liveContexts++;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let disposed = false;
    let raf = 0;
    let visible = false;
    let mx = 0, my = 0;
    let cleanupThree: (() => void) | null = null;

    import('three').then(THREE => {
      if (disposed || !hostRef.current) return;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      host.appendChild(renderer.domElement);
      renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';

      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
      camera.position.z = zoom;

      const { scene, update, dispose } = buildScene(THREE, artifact);

      const size = () => {
        const w = host.clientWidth || 1;
        const h = host.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      size();
      const ro = new ResizeObserver(size);
      ro.observe(host);

      const onPointer = (e: PointerEvent) => {
        mx = (e.clientX / window.innerWidth) * 2 - 1;
        my = (e.clientY / window.innerHeight) * 2 - 1;
      };

      const loop = (now: number) => {
        if (!visible) { raf = 0; return; }
        update(now / 1000, mx, my);
        renderer.render(scene, camera);
        raf = requestAnimationFrame(loop);
      };

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (reduce) {
          if (visible) { update(2, 0, 0); renderer.render(scene, camera); }
          return;
        }
        if (visible && !raf) raf = requestAnimationFrame(loop);
      }, { rootMargin: '10% 0px' });
      io.observe(host);

      if (!reduce) window.addEventListener('pointermove', onPointer, { passive: true });

      cleanupThree = () => {
        io.disconnect();
        ro.disconnect();
        window.removeEventListener('pointermove', onPointer);
        if (raf) cancelAnimationFrame(raf);
        dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      disposed = true;
      cleanupThree?.();
      liveContexts--;
    };
  }, [artifact, zoom]);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={className}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity, ...style }}
    />
  );
};
