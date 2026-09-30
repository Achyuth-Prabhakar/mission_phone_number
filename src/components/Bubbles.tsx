import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

// Translucent chat bubbles and notification pings drifting behind the content: the story is a
// conversation moving out of the DMs. Deterministic positions so nothing jumps between renders.
const bubbles = [
  { x: 6, y: 12, w: 84, dots: 3, dur: 15, delay: 0, depth: 14, flip: false },
  { x: 72, y: 8, w: 64, dots: 0, dur: 18, delay: 2, depth: 22, flip: true },
  { x: 82, y: 34, w: 96, dots: 3, dur: 20, delay: 1, depth: 10, flip: true },
  { x: 4, y: 46, w: 58, dots: 0, dur: 17, delay: 3, depth: 26, flip: false },
  { x: 60, y: 62, w: 72, dots: 3, dur: 19, delay: 4, depth: 18, flip: false },
  { x: 14, y: 88, w: 90, dots: 0, dur: 16, delay: 2, depth: 12, flip: true },
  { x: 84, y: 84, w: 56, dots: 3, dur: 21, delay: 5, depth: 24, flip: true },
]

const pings = [
  { x: 24, y: 28, delay: 0 },
  { x: 78, y: 52, delay: 1.4 },
  { x: 40, y: 88, delay: 2.6 },
]

function Bubble({ w, dots, flip }: { w: number; dots: number; flip: boolean }) {
  const h = w * 0.62
  return (
    <svg width={w} height={h + 10} viewBox={`0 0 ${w} ${h + 10}`} aria-hidden style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
      <path
        d={`M14 0 H${w - 14} a14 14 0 0 1 14 14 V${h - 14} a14 14 0 0 1 -14 14 H26 L10 ${h + 10} L14 ${h} a14 14 0 0 1 -14 -14 V14 a14 14 0 0 1 14 -14Z`}
        fill="rgba(255,255,255,0.55)"
        stroke="rgba(214,51,111,0.28)"
        strokeWidth="1.2"
      />
      {dots > 0 ? (
        [0, 1, 2].map((i) => <circle key={i} cx={w / 2 - 12 + i * 12} cy={h / 2} r="3.2" fill="rgba(214,51,111,0.45)" />)
      ) : (
        <>
          <rect x="16" y={h / 2 - 8} width={w * 0.55} height="5" rx="2.5" fill="rgba(214,51,111,0.3)" />
          <rect x="16" y={h / 2 + 3} width={w * 0.35} height="5" rx="2.5" fill="rgba(214,51,111,0.2)" />
        </>
      )}
    </svg>
  )
}

export default function Bubbles() {
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 40, damping: 20 })
  const sy = useSpring(py, { stiffness: 40, damping: 20 })

  // Bubbles drift a little against the pointer, at different depths.
  useEffect(() => {
    if (reduce) return
    const move = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth - 0.5) * 2)
      py.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [reduce, px, py])

  return (
    <div aria-hidden className="absolute inset-0">
      {bubbles.map((b, i) => (
        <Parallax key={i} sx={sx} sy={sy} depth={b.depth} style={{ left: `${b.x}%`, top: `${b.y}%` }} className={b.y <= 14 || b.y >= 84 ? '' : 'hidden sm:block'}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={reduce ? { opacity: 0.9, scale: 1 } : { opacity: [0, 0.95, 0.95], scale: 1, y: [0, -26, 0], rotate: [-3, 3, -3] }}
            transition={
              reduce
                ? { duration: 0.6 }
                : { opacity: { duration: 1.4, delay: b.delay * 0.3 }, scale: { duration: 1.2, delay: b.delay * 0.3 }, y: { duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: b.delay }, rotate: { duration: b.dur * 1.3, repeat: Infinity, ease: 'easeInOut' } }
            }
          >
            <Bubble w={b.w} dots={b.dots} flip={b.flip} />
          </motion.div>
        </Parallax>
      ))}
      {!reduce &&
        pings.map((p, i) => (
          <span key={i} className={`absolute ${p.y >= 84 ? '' : 'hidden sm:block'}`} style={{ left: `${p.x}%`, top: `${p.y}%` }}>
            <motion.span
              className="absolute -top-2 -left-2 h-4 w-4 rounded-full bg-pink/60"
              animate={{ scale: [1, 3.2], opacity: [0.5, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, delay: p.delay, ease: 'easeOut' }}
            />
            <span className="absolute -top-1 -left-1 h-2 w-2 rounded-full bg-pink/70" />
          </span>
        ))}
    </div>
  )
}

function Parallax({ sx, sy, depth, style, className = '', children }: { sx: ReturnType<typeof useSpring>; sy: ReturnType<typeof useSpring>; depth: number; style: React.CSSProperties; className?: string; children: React.ReactNode }) {
  const x = useTransform(sx, (v) => v * depth)
  const y = useTransform(sy, (v) => v * depth)
  return (
    <motion.div className={`absolute ${className}`} style={{ ...style, x, y }}>
      {children}
    </motion.div>
  )
}
