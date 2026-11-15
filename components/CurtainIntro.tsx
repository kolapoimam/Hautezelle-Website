import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { getAudio, playCurtainOpen, unlockAudio } from './curtainSound';

// Theatre curtain that greets visitors once per browser session.
// It opens by itself shortly after load. Any early tap, scroll or key press opens it at once.

const SEEN_KEY = 'hz-curtain-seen';
const OPEN_MS = 1900; // time for the drapes to gather at the sides
const AUTO_OPEN_MS = 1400; // brief pause on the brand, then the curtains open by themselves

type Phase = 'closed' | 'opening' | 'leaving' | 'gone';



const shouldShow = () => {
  if (typeof window === 'undefined') return false;
  if (/[?&]nocurtain\b/.test(window.location.search + window.location.hash)) return false;
  try {
    return sessionStorage.getItem(SEEN_KEY) !== '1';
  } catch {
    return true;
  }
};

const OPEN_EVENT = 'hz:curtain-open';

/** True once the curtain has started opening (or straight away if it is not shown). */
export const useCurtainOpened = () => {
  const [opened, setOpened] = useState(() => !shouldShow());
  useEffect(() => {
    if (opened) return;
    const on = () => setOpened(true);
    window.addEventListener(OPEN_EVENT, on);
    return () => window.removeEventListener(OPEN_EVENT, on);
  }, [opened]);
  return opened;
};

/** Velvet: soft vertical folds, darker at the top and floor, and a gold braid on the inner edge. */
const velvet = (side: 'left' | 'right', fold: number): React.CSSProperties => ({
  backgroundImage: [
    // light falling from the top lights
    `radial-gradient(120% 60% at ${side === 'left' ? '85%' : '15%'} 0%, rgba(153,246,228,0.16), transparent 60%)`,
    // vertical shading
    'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0.05) 70%, rgba(0,0,0,0.55) 100%)',
    // the folds
    `repeating-linear-gradient(90deg, #03302d 0px, #0a5a53 ${fold * 0.28}px, #13786e ${fold * 0.42}px, #0a5a53 ${fold * 0.58}px, #042f2c ${fold * 0.86}px, #03302d ${fold}px)`,
  ].join(','),
  backgroundColor: '#063f3b',
});

const Fringe: React.FC = () => (
  <div
    className="absolute left-0 right-0 bottom-0 h-7 md:h-9"
    style={{
      backgroundImage:
        'linear-gradient(180deg, #b8892b 0px, #f3d27a 3px, #c79a3a 6px, transparent 7px), repeating-linear-gradient(90deg, #d8b25a 0px, #f6dd94 1.5px, #a97b22 3px, transparent 3.5px, transparent 6px)',
      WebkitMaskImage: 'linear-gradient(180deg, #000 70%, transparent)',
      maskImage: 'linear-gradient(180deg, #000 70%, transparent)',
    }}
  />
);

const Braid: React.FC<{ side: 'left' | 'right' }> = ({ side }) => (
  <div
    className={`absolute top-0 bottom-0 w-[10px] md:w-[14px] ${side === 'left' ? 'right-0' : 'left-0'}`}
    style={{
      backgroundImage:
        'repeating-linear-gradient(160deg, #a77a20 0px, #f4d888 4px, #c8993b 8px, #8a6114 11px, #a77a20 12px)',
      boxShadow: side === 'left' ? '-6px 0 14px rgba(0,0,0,0.45)' : '6px 0 14px rgba(0,0,0,0.45)',
    }}
  />
);

const Diamond: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="-80 -80 160 200" className={className} aria-hidden>
    {[[-58, -56, -28], [-20, -66, -10], [20, -66, 10], [58, -56, 28]].map(([x, y, r], i) => (
      <rect key={i} x={x - 6} y={y - 20} width={12} height={34} rx={2} fill="#f3d27a" transform={`rotate(${r} ${x} ${y})`} />
    ))}
    <g stroke="#0b0b0c" strokeWidth={6} strokeLinejoin="round">
      <polygon points="-75,0 -45,-34 -30,0" fill="#3fc4bd" />
      <polygon points="-45,-34 0,-34 -30,0" fill="#2aa9a5" />
      <polygon points="0,-34 -30,0 30,0" fill="#5fe0d5" />
      <polygon points="0,-34 45,-34 30,0" fill="#2aa9a5" />
      <polygon points="45,-34 75,0 30,0" fill="#239893" />
      <polygon points="-75,0 -30,0 0,118" fill="#1f9692" />
      <polygon points="-30,0 30,0 0,118" fill="#35b8b1" />
      <polygon points="30,0 75,0 0,118" fill="#178580" />
    </g>
    <polygon points="-75,0 -45,-34 45,-34 75,0 0,118" fill="none" stroke="#f3d27a" strokeWidth={5} strokeLinejoin="round" />
  </svg>
);

const CurtainIntro: React.FC = () => {
  const [phase, setPhase] = useState<Phase>(() => (shouldShow() ? 'closed' : 'gone'));
  const [fold, setFold] = useState(72);
  const reduce = useReducedMotion();
  const started = useRef(false);

  useEffect(() => {
    const set = () => setFold(window.innerWidth < 640 ? 42 : window.innerWidth < 1024 ? 58 : 76);
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);

  // Lock scrolling while the curtain is down
  useEffect(() => {
    if (phase === 'gone') return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  const open = useCallback(async (fromTap: boolean) => {
    if (started.current) return;
    started.current = true;
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* private mode */
    }
    if (fromTap) await unlockAudio();
    else {
      // Without a tap most browsers keep sound off; try anyway in case this visitor allowed it before.
      const a = getAudio();
      try {
        await a?.resume();
      } catch {
        /* ignore */
      }
    }
    if (!reduce) playCurtainOpen(OPEN_MS / 1000);
    setPhase('opening');
    window.setTimeout(() => window.dispatchEvent(new Event(OPEN_EVENT)), reduce ? 0 : 450);
    window.setTimeout(() => setPhase('leaving'), reduce ? 50 : OPEN_MS + 150);
  }, [reduce]);

  useEffect(() => {
    if (phase !== 'closed') return;
    const t = window.setTimeout(() => open(false), AUTO_OPEN_MS);
    const early = () => open(true);
    const evts = ['keydown', 'wheel', 'touchstart', 'pointerdown'] as const;
    evts.forEach((e) => window.addEventListener(e, early, { passive: true }));
    return () => {
      window.clearTimeout(t);
      evts.forEach((e) => window.removeEventListener(e, early));
    };
  }, [phase, open]);

  if (phase === 'gone') return null;

  const opening = phase === 'opening' || phase === 'leaving';
  const leaving = phase === 'leaving';
  const ease = [0.7, 0, 0.25, 1] as const;

  const panel = (side: 'left' | 'right') => {
    const dir = side === 'left' ? -1 : 1;
    return (
      <motion.div
        key={side}
        className={`absolute top-0 h-full w-[calc(50%+2px)] ${side === 'left' ? 'left-0' : 'right-0'} overflow-hidden`}
        style={{ ...velvet(side, fold), transformOrigin: `${side} top`, willChange: 'transform' }}
        initial={false}
        animate={
          leaving
            ? { x: `${dir * 105}%`, scaleX: 0.16, skewX: 0, transition: { duration: 0.7, ease: [0.5, 0, 0.75, 0] } }
            : opening
              ? {
                  scaleX: [1, 1.02, 0.55, 0.2, 0.22],
                  skewX: [0, -dir * 1.5, -dir * 7, -dir * 2, 0],
                  x: '0%',
                  transition: { duration: OPEN_MS / 1000, ease, times: [0, 0.12, 0.55, 0.9, 1] },
                }
              : {
                  // idle: a slow breathing sway so the fabric feels alive
                  skewX: [0, -dir * 0.6, 0, dir * 0.4, 0],
                  scaleX: [1, 0.995, 1, 0.997, 1],
                  transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                }
        }
      >
        <Braid side={side} />
        <Fringe />
      </motion.div>
    );
  };

  return (
    <AnimatePresence>
      {(

        <motion.div
          key="curtain"
          role="dialog"
          aria-label="Welcome to Hautezelle Studio"
          className="fixed inset-0 z-[200] select-none"
          style={{ height: '100dvh' }}
          onClick={() => open(true)}
          initial={{ opacity: 1 }}
          animate={{ opacity: leaving ? 0 : 1 }}
          transition={{ duration: 0.45, delay: leaving ? 0.35 : 0 }}
          onAnimationComplete={() => {
            if (leaving) setPhase('gone');
          }}
        >
          {/* shadow the drapes cast on the stage */}
          <motion.div
            className="absolute inset-0 bg-black"
            animate={{ opacity: opening ? 0 : 0.6 }}
            transition={{ duration: 1.2 }}
          />

          {panel('left')}
          {panel('right')}

          {/* valance across the top */}
          <motion.div
            className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
            animate={{ y: leaving ? '-110%' : 0 }}
            transition={{ duration: 0.6, ease: [0.5, 0, 0.75, 0] }}
          >
            <div
              className="h-[56px] md:h-[84px]"
              style={{
                backgroundImage:
                  'linear-gradient(180deg, rgba(0,0,0,0.5), rgba(0,0,0,0) 60%), repeating-linear-gradient(90deg, #052f2c 0, #0d675f 18px, #052f2c 36px)',
                boxShadow: '0 10px 24px rgba(0,0,0,0.45)',
              }}
            />
            <div
              className="h-[26px] md:h-[38px] -mt-px"
              style={{
                backgroundImage:
                  'radial-gradient(ellipse 50% 100% at 50% 0%, #0b5a53 0 92%, #f3d27a 93% 98%, transparent 99%)',
                backgroundSize: `${fold * 2}px 100%`,
                backgroundRepeat: 'repeat-x',
                filter: 'drop-shadow(0 6px 6px rgba(0,0,0,0.4))',
              }}
            />
          </motion.div>

          {/* centre: brand and the tap prompt */}
          <AnimatePresence>
            {!opening && (
              <motion.div
                key="centre"
                className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.25 } }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Diamond className="w-14 h-16 md:w-20 md:h-24 mx-auto mb-4 drop-shadow-[0_6px_14px_rgba(0,0,0,0.5)]" />
                </motion.div>
                <p className="text-[#f3d27a] tracking-[0.45em] text-[10px] md:text-xs uppercase mb-3">Welcome to</p>
                <p style={{ fontFamily: "'Playfair Display', serif" }} className="font-serif text-white text-5xl md:text-7xl leading-none drop-shadow-[0_4px_18px_rgba(0,0,0,0.6)]">
                  Hautezelle
                </p>
                <p className="text-teal-100/80 tracking-[0.3em] text-[10px] md:text-xs uppercase mt-3">Studio</p>

              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CurtainIntro;
