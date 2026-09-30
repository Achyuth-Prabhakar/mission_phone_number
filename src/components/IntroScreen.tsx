import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { content } from '../content'
import { Screen } from './ui'

const ease = [0.22, 1, 0.36, 1] as const

/** Fake-serious opener: three short beats, then the button. */
export default function IntroScreen({ onNext }: { onNext: () => void }) {
  const c = content.intro
  const [pokes, setPokes] = useState(0)

  return (
    <Screen>
      <h1 className="font-display text-[3.4rem] leading-[1.02] font-medium tracking-tight text-plum sm:text-7xl">
        {c.headline.map((line, i) => {
          const accent = line === c.accentWord
          return (
            <motion.span
              key={line}
              className="block"
              initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.4 + i * 0.6, duration: 0.9, ease }}
            >
              {accent ? (
                <motion.button
                  type="button"
                  onClick={() => setPokes((n) => n + 1)}
                  aria-label={c.accentWord}
                  animate={{ rotate: pokes ? [0, -6, 5, -3, 0] : 0, scale: pokes ? [1, 1.08, 1] : 1 }}
                  transition={{ duration: 0.45 }}
                  key={pokes}
                  className="cursor-pointer font-display text-pink italic focus-visible:outline-none"
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
              className="font-display text-base text-berry italic"
            >
              {c.pokes[Math.min(pokes, c.pokes.length) - 1]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.6, duration: 0.8, ease }}
        className="mt-6 text-xl text-plum-soft"
      >
        {c.sub}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.4, duration: 0.6, ease }}
        className="mt-9"
      >
        <motion.button
          onClick={onNext}
          whileTap={{ scale: 0.97 }}
          whileHover={{ y: -2 }}
          className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-pink px-8 text-[17px] font-medium text-white shadow-[0_10px_30px_-10px_rgba(214,51,111,0.7)] transition-colors hover:bg-pink-deep focus-visible:ring-4 focus-visible:ring-pink/30 focus-visible:outline-none sm:w-auto"
        >
          {c.button}
          <span aria-hidden>→</span>
        </motion.button>
      </motion.div>
    </Screen>
  )
}
