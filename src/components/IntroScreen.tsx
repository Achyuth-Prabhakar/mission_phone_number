import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { content } from '../content'
import { Screen } from './ui'

const ease = [0.22, 1, 0.36, 1] as const

/** Fake-serious opener: a dramatic "we need to talk", then the relief beat a moment later. */
export default function IntroScreen({ onNext }: { onNext: () => void }) {
  const c = content.intro
  const [pokes, setPokes] = useState(0)

  return (
    <Screen>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.22em] text-salmon"
      >
        <motion.span
          className="h-px bg-salmon/70"
          initial={{ width: 0 }}
          animate={{ width: 32 }}
          transition={{ delay: 0.3, duration: 0.8, ease }}
        />
        {c.eyebrow}
      </motion.div>

      <h1 className="mt-6 font-display text-[3.4rem] leading-[1.02] font-medium tracking-tight text-ivory sm:text-7xl">
        {c.headline.map((line, i) => {
          const accent = line === c.accentWord
          return (
            <motion.span
              key={line}
              className="block"
              initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.8 + i * 0.5, duration: 0.9, ease }}
            >
              {accent ? (
                <motion.button
                  type="button"
                  onClick={() => setPokes((n) => n + 1)}
                  aria-label={c.accentWord}
                  animate={{ rotate: pokes ? [0, -6, 5, -3, 0] : 0, scale: pokes ? [1, 1.08, 1] : 1 }}
                  transition={{ duration: 0.45 }}
                  key={pokes}
                  className="cursor-pointer font-display text-salmon italic focus-visible:outline-none"
                >
                  {line}
                </motion.button>
              ) : (
                line
              )}
            </motion.span>
          )
        })}
      </h1>

      <div className="mt-2 min-h-6">
        <AnimatePresence mode="wait">
          {pokes > 0 && (
            <motion.p
              key={pokes}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-display text-base text-salmon/80 italic"
            >
              {c.pokes[Math.min(pokes, c.pokes.length) - 1]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8, ease }}
        className="mt-6 text-xl font-semibold text-ivory"
      >
        {c.relief}
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 3.4, duration: 0.6, ease }}
        style={{ originX: 0 }}
        className="my-6 h-px w-20 bg-salmon"
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.7, duration: 0.8 }}
        className="text-base leading-relaxed text-ivory/70"
      >
        {c.body}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4.4, duration: 0.6, ease }}
        className="mt-9"
      >
        <motion.button
          onClick={onNext}
          whileTap={{ scale: 0.97 }}
          whileHover={{ y: -2 }}
          className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-lg bg-salmon px-8 text-[17px] font-medium text-night shadow-[0_10px_40px_-12px_rgba(244,161,147,0.7)] transition-colors hover:bg-[#f8b3a7] focus-visible:ring-4 focus-visible:ring-salmon/40 focus-visible:outline-none sm:w-auto"
        >
          {c.button}
          <span aria-hidden>→</span>
        </motion.button>
      </motion.div>
    </Screen>
  )
}
