/* ═══════════════════════════════════════════════════════════════════════
   PARALLAX ENGINE — single shared requestAnimationFrame loop
   ───────────────────────────────────────────────────────────────────────
   One pointer, one loop, many layers. Each layer smooths the normalized
   cursor vector toward its own target with a frame-rate-independent lerp:

       k   = 1 - exp(-λ · dt)          // λ per layer → depth shear
       cx += (targetX - cx) · k

   Different λ per z-layer is the whole trick: the background settles slower
   than the foreground, so every mouse move produces a brief depth shear.

   The loop only runs while ≥1 layer is registered (layers register via
   IntersectionObserver, so off-screen stages cost nothing). When any form
   field gains focus anywhere, motion eases to rest so nothing drifts while
   the user types. Touch / reduced-motion never register — they stay static.
   ═══════════════════════════════════════════════════════════════════════ */

export type Depth = 'deep' | 'mid' | 'hud' | 'content';
export type Intensity = 'full' | 'soft';
export type Effect = 'airy' | 'swivel' | 'track3d';

interface LayerConfig {
  el: HTMLElement;
  depth: Depth;
  intensity: Intensity;
  effect: Effect;
}

interface Layer extends LayerConfig {
  cx: number;
  cy: number;
  /** untransformed ancestor used to measure scroll progress (the stage) */
  host: HTMLElement | null;
}

/* px of scroll-driven glide at full progress, deep layers only */
const SCROLL_AMP = 46;

/* px of travel at |n| = 1, per intensity × depth */
const AMP: Record<Intensity, Record<Depth, number>> = {
  full: { deep: 10, mid: 24, hud: 44, content: 0 },
  soft: { deep: 4, mid: 8, hud: 0, content: 0 },
};

/* smoothing rate (s⁻¹); higher = snappier. content mirrors hud (amp 0) */
const LAMBDA: Record<Intensity, Record<Depth, number>> = {
  full: { deep: 3, mid: 5, hud: 8, content: 8 },
  soft: { deep: 2, mid: 3.5, hud: 8, content: 8 },
};

/* max degrees of swivel rotation at |n| = 1 */
const SWIVEL_DEG: Record<Intensity, number> = { full: 9, soft: 1.5 };

/* translateZ per depth for the track3d effect (needs stage perspective) */
const TRACK_Z: Record<Depth, number> = { deep: -60, mid: 0, hud: 40, content: 0 };

const REST_EPSILON = 0.0004; // below this, snap to 0 and skip writes

class ParallaxEngine {
  private layers = new Set<Layer>();
  private targetX = 0;
  private targetY = 0;
  private suspended = false;
  private rafId: number | null = null;
  private last = 0;
  private listening = false;

  /** Motion is allowed only on hover-capable devices without reduced-motion. */
  get motionOK(): boolean {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const noHover = window.matchMedia('(hover: none)').matches;
    return !reduce && !noHover;
  }

  register(config: LayerConfig): () => void {
    if (!this.motionOK) {
      config.el.style.transform = '';
      return () => {};
    }
    const layer: Layer = {
      ...config, cx: 0, cy: 0,
      host: config.el.closest<HTMLElement>('.sr-stage') ?? config.el.parentElement,
    };
    this.layers.add(layer);
    this.ensureListening();
    this.start();
    return () => {
      this.layers.delete(layer);
      layer.el.style.transform = '';
      if (this.layers.size === 0) this.stop();
    };
  }

  private ensureListening() {
    if (this.listening || typeof window === 'undefined') return;
    window.addEventListener('pointermove', this.onPointerMove, { passive: true });
    window.addEventListener('focusin', this.onFocusChange, true);
    window.addEventListener('focusout', this.onFocusChange, true);
    this.listening = true;
  }

  private teardownListening() {
    if (!this.listening || typeof window === 'undefined') return;
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('focusin', this.onFocusChange, true);
    window.removeEventListener('focusout', this.onFocusChange, true);
    this.listening = false;
  }

  private onPointerMove = (e: PointerEvent) => {
    this.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    this.targetY = (e.clientY / window.innerHeight) * 2 - 1;
  };

  /* Suspend motion while a text-entry field is focused (Tier B usability). */
  private onFocusChange = () => {
    const el = document.activeElement as HTMLElement | null;
    const tag = el?.tagName;
    this.suspended =
      tag === 'INPUT' ||
      tag === 'TEXTAREA' ||
      tag === 'SELECT' ||
      el?.isContentEditable === true;
  };

  private start() {
    if (this.rafId !== null) return;
    this.last = performance.now();
    this.rafId = requestAnimationFrame(this.tick);
  }

  private stop() {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.rafId = null;
    this.teardownListening();
  }

  private tick = (now: number) => {
    const dt = Math.min((now - this.last) / 1000, 0.05); // clamp tab-switch spikes
    this.last = now;

    const tx = this.suspended ? 0 : this.targetX;
    const ty = this.suspended ? 0 : this.targetY;

    for (const layer of this.layers) {
      const k = 1 - Math.exp(-LAMBDA[layer.intensity][layer.depth] * dt);
      layer.cx += (tx - layer.cx) * k;
      layer.cy += (ty - layer.cy) * k;
      if (Math.abs(layer.cx) < REST_EPSILON) layer.cx = 0;
      if (Math.abs(layer.cy) < REST_EPSILON) layer.cy = 0;
      layer.el.style.transform = this.compose(layer);
    }

    this.rafId = requestAnimationFrame(this.tick);
  };

  private compose(layer: Layer): string {
    const amp = AMP[layer.intensity][layer.depth];
    const x = (layer.cx * amp).toFixed(2);

    /* scroll glide: -1 (stage below viewport) → +1 (stage above). The host
       stage is never transformed, so measuring it is feedback-free. */
    let scrollY = 0;
    if (layer.host && layer.depth === 'deep') {
      const r = layer.host.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const center = r.top + r.height / 2;
      const progress = (vh / 2 - center) / ((vh + r.height) / 2); // -1 entering → +1 leaving
      scrollY = Math.max(-1, Math.min(1, progress)) * SCROLL_AMP;
    }
    const y = (layer.cy * amp + scrollY).toFixed(2);

    if (layer.effect === 'swivel') {
      const deg = SWIVEL_DEG[layer.intensity];
      return `rotateY(${(layer.cx * deg).toFixed(2)}deg) rotateX(${(-layer.cy * deg).toFixed(
        2
      )}deg) translate3d(${x}px, ${y}px, 0)`;
    }
    if (layer.effect === 'track3d') {
      return `translate3d(${x}px, ${y}px, ${TRACK_Z[layer.depth]}px)`;
    }
    // airy (default)
    return `translate3d(${x}px, ${y}px, 0)`;
  }
}

export const parallaxEngine = new ParallaxEngine();
