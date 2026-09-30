import { motion } from 'framer-motion'

/** Minimal sunset over gently moving waves. */
export function BeachScene() {
  return (
    <div className="relative h-44 w-full overflow-hidden rounded-3xl border border-white/70 shadow-[0_20px_50px_-25px_rgba(214,51,111,0.6)]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#f4a9c4] via-[#f9c8da] to-[#fff0f4]" />
      <motion.div
        className="absolute left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-white"
        style={{ boxShadow: '0 0 60px 20px rgba(255,255,255,0.8)' }}
        initial={{ bottom: -10 }}
        animate={{ bottom: 62 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-24 w-full" aria-hidden>
        <motion.path
          d="M0 40 Q 50 20 100 40 T 200 40 T 300 40 T 400 40 V120 H0Z"
          fill="#e88aac"
          fillOpacity="0.55"
          animate={{ x: [0, -30, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M-40 65 Q 10 45 60 65 T 160 65 T 260 65 T 360 65 T 460 65 V120 H-40Z"
          fill="#d6336f"
          fillOpacity="0.7"
          animate={{ x: [0, 25, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  )
}

/** A cup with three wisps of steam. */
export function CoffeeScene() {
  return (
    <div className="relative flex h-44 w-full items-end justify-center overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-b from-[#fde8ef] to-[#f8cfdd] pb-6 shadow-[0_20px_50px_-25px_rgba(214,51,111,0.6)]">
      <svg viewBox="0 0 120 110" className="h-32" aria-hidden>
        {[38, 58, 78].map((x, i) => (
          <motion.path
            key={x}
            d={`M${x} 46 q -8 -10 0 -20 q 8 -10 0 -20`}
            fill="none"
            stroke="#8b2456"
            strokeOpacity="0.5"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: [0, 0.8, 0], y: [8, -6, -14] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.5, ease: 'easeOut' }}
          />
        ))}
        <path d="M22 54 H94 V78 a20 20 0 0 1 -20 20 H42 a20 20 0 0 1 -20 -20Z" fill="#fffaf8" />
        <path d="M94 62 h6 a10 10 0 0 1 0 20 h-8" fill="none" stroke="#fffaf8" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="58" cy="54" rx="36" ry="5" fill="#e88aac" />
      </svg>
    </div>
  )
}
