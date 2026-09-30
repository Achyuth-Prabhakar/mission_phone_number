import { motion } from 'framer-motion'
import type { Choice } from '../content'
import { itemVariants } from './ui'

type Option = { id: Choice; icon: string; title: string; description: string; small: string; button: string }

type Props = {
  option: Option
  state: 'idle' | 'selected' | 'faded'
  onHover: (id: Choice | null) => void
  onSelect: (id: Choice) => void
}

export default function ChoiceCard({ option, state, onHover, onSelect }: Props) {
  const primary = option.id === 'phone'
  return (
    <motion.div variants={itemVariants} className="h-full">
      <motion.article
        onHoverStart={() => onHover(option.id)}
        onHoverEnd={() => onHover(null)}
        whileHover={state === 'idle' ? 'hover' : undefined}
        animate={state}
        variants={{
          idle: { scale: 1, opacity: 1, y: 0 },
          hover: { y: -6, boxShadow: '0 24px 60px -20px rgba(214,51,111,0.55)' },
          selected: { scale: 1.04, y: -4, boxShadow: '0 30px 80px -20px rgba(214,51,111,0.7)' },
          faded: { scale: 0.96, opacity: 0.3 },
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className={`relative flex h-full flex-col rounded-3xl border p-6 shadow-[0_16px_40px_-28px_rgba(139,36,86,0.4)] backdrop-blur-xl ${
          primary ? 'border-pink/30 bg-cream/85' : 'border-white/80 bg-cream/60'
        } ${state === 'selected' ? 'z-10 border-pink/60' : ''}`}
      >
        {primary && (
          <span className="absolute top-5 right-5 rounded-full bg-rose-soft px-2.5 py-1 text-[11px] font-semibold tracking-wide text-berry">
            my pick
          </span>
        )}
        <motion.span
          aria-hidden
          className="inline-block w-fit text-4xl"
          variants={{ hover: { rotate: [0, -10, 8, 0], scale: 1.12, transition: { duration: 0.6 } } }}
        >
          {option.icon}
        </motion.span>
        <h2 className="mt-4 font-display text-2xl leading-tight font-semibold text-plum">{option.title}</h2>
        <p className="mt-2 text-base text-plum-soft">{option.description}</p>
        <p className="mt-1 text-sm text-plum-soft/75 italic">{option.small}</p>
        <div className="mt-auto pt-6">
          <button
            onClick={() => state === 'idle' && onSelect(option.id)}
            className={`min-h-13 w-full rounded-full px-5 text-base font-medium transition-colors duration-200 focus-visible:ring-4 focus-visible:ring-pink/30 focus-visible:outline-none ${
              primary ? 'bg-pink text-white hover:bg-pink-deep' : 'border border-rose bg-white/60 text-plum hover:border-pink hover:bg-white'
            }`}
          >
            {option.button}
          </button>
        </div>
      </motion.article>
    </motion.div>
  )
}
