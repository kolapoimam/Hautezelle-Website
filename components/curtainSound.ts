// Curtain sounds made with the Web Audio API, so there are no audio files to load.
// Three layers: brass rings sliding along the rod, heavy velvet swishing apart,
// and a soft sparkle as the stage is revealed.

type Ctx = AudioContext;

let ctx: Ctx | null = null;

export const getAudio = (): Ctx | null => {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
};

/** Call inside a tap or click so mobile browsers allow sound. */
export const unlockAudio = async (): Promise<boolean> => {
  const a = getAudio();
  if (!a) return false;
  try {
    if (a.state !== 'running') await a.resume();
    // iOS needs a sound to start inside the gesture; a silent one is enough.
    const b = a.createBuffer(1, 1, 22050);
    const s = a.createBufferSource();
    s.buffer = b;
    s.connect(a.destination);
    s.start(0);
  } catch {
    /* ignore */
  }
  return a.state === 'running';
};

const noiseBuffer = (a: Ctx, seconds: number) => {
  const len = Math.floor(a.sampleRate * seconds);
  const buf = a.createBuffer(1, len, a.sampleRate);
  const d = buf.getChannelData(0);
  // Brown-ish noise: warmer and heavier than white noise, like thick fabric.
  let last = 0;
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1;
    last = (last + 0.06 * w) / 1.06;
    d[i] = last * 3.2 + w * 0.18;
  }
  return buf;
};

const panner = (a: Ctx, pan: number): AudioNode => {
  if ((a as any).createStereoPanner) {
    const p = a.createStereoPanner();
    p.pan.value = pan;
    return p;
  }
  return a.createGain();
};

/** Velvet swish: filtered noise with a sweep that rises then falls. */
const swish = (a: Ctx, out: AudioNode, t0: number, dur: number, pan: number) => {
  const src = a.createBufferSource();
  src.buffer = noiseBuffer(a, dur + 0.2);
  const bp = a.createBiquadFilter();
  bp.type = 'bandpass';
  bp.Q.value = 0.9;
  bp.frequency.setValueAtTime(380, t0);
  bp.frequency.exponentialRampToValueAtTime(1900, t0 + dur * 0.35);
  bp.frequency.exponentialRampToValueAtTime(520, t0 + dur);
  const lp = a.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 3200;
  const g = a.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(0.55, t0 + dur * 0.22);
  g.gain.setValueAtTime(0.5, t0 + dur * 0.45);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  const p = panner(a, pan);
  src.connect(bp).connect(lp).connect(g).connect(p).connect(out);
  src.start(t0);
  src.stop(t0 + dur + 0.2);
};

/** One brass ring clicking along the curtain rod. */
const ring = (a: Ctx, out: AudioNode, t: number, pan: number, vol: number) => {
  const p = panner(a, pan);
  p.connect(out);
  const base = 2300 + Math.random() * 900;
  [1, 1.53, 2.41].forEach((mult, i) => {
    const o = a.createOscillator();
    o.type = 'sine';
    o.frequency.value = base * mult;
    const g = a.createGain();
    const v = vol * (i === 0 ? 0.09 : 0.04);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(v, t + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.07 + i * 0.02);
    o.connect(g).connect(p);
    o.start(t);
    o.stop(t + 0.15);
  });
  // Tiny scrape that comes with each click
  const n = a.createBufferSource();
  n.buffer = noiseBuffer(a, 0.05);
  const hp = a.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = 4000;
  const g = a.createGain();
  g.gain.setValueAtTime(vol * 0.12, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
  n.connect(hp).connect(g).connect(p);
  n.start(t);
  n.stop(t + 0.05);
};

/** Runs of ring clicks that start fast and slow down as the curtain settles. */
const ringRun = (a: Ctx, out: AudioNode, t0: number, dur: number, pan: number) => {
  const count = 16;
  for (let i = 0; i < count; i++) {
    const k = i / (count - 1);
    // ease out: clicks bunch together at the start and spread out at the end
    const t = t0 + dur * (1 - Math.pow(1 - k, 2.2)) + (Math.random() - 0.5) * 0.02;
    ring(a, out, t, pan * (0.4 + k * 0.6), 1 - k * 0.6);
  }
};

/** A soft rising sparkle for the reveal. */
const sparkle = (a: Ctx, out: AudioNode, t0: number) => {
  const notes = [1046.5, 1318.5, 1568, 2093]; // C6 E6 G6 C7
  notes.forEach((f, i) => {
    const t = t0 + i * 0.075;
    const o = a.createOscillator();
    o.type = 'triangle';
    o.frequency.value = f;
    const g = a.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.05, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
    o.connect(g).connect(out);
    o.start(t);
    o.stop(t + 1);
  });
};

/** Tassel tug when the visitor taps to open. */
const tug = (a: Ctx, out: AudioNode, t: number) => {
  const o = a.createOscillator();
  o.type = 'sine';
  o.frequency.setValueAtTime(180, t);
  o.frequency.exponentialRampToValueAtTime(70, t + 0.12);
  const g = a.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.35, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
  o.connect(g).connect(out);
  o.start(t);
  o.stop(t + 0.2);
};

export const playCurtainOpen = (duration: number) => {
  const a = getAudio();
  if (!a || a.state !== 'running') return;
  const master = a.createGain();
  master.gain.value = 0.8;
  const comp = a.createDynamicsCompressor();
  master.connect(comp).connect(a.destination);
  const t = a.currentTime + 0.02;
  tug(a, master, t);
  ringRun(a, master, t + 0.08, duration * 0.85, -0.8);
  ringRun(a, master, t + 0.11, duration * 0.85, 0.8);
  swish(a, master, t + 0.05, duration, -0.6);
  swish(a, master, t + 0.09, duration * 0.95, 0.6);
  sparkle(a, master, t + duration * 0.7);
};
