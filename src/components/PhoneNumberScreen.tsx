import { AnimatePresence, motion } from 'framer-motion'
import { useState, type ReactNode } from 'react'
import { content, type Venue } from '../content'
import { dbEnabled } from '../notify'
import { Button, Glass, Headline, Item, Screen } from './ui'

/** Formats digits as (555) 555-5555 while typing. Purely cosmetic; nothing leaves this component. */
function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, '').slice(0, 10)
  if (d.length < 4) return d
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}

type Props = {
  headline: string
  children?: ReactNode
  buttonLabel: string
  onSubmit: (phone: string) => void
}

/** Shared by the phone, beach and coffee paths: intro copy, then the number field revealed below. */
export default function PhoneNumberScreen({ headline, children, buttonLabel, onSubmit }: Props) {
  const [value, setValue] = useState('')
  const valid = value.replace(/\D/g, '').length === 10
  const [declines, setDeclines] = useState(0)
  const { decline } = content.phoneInput

  return (
    <Screen>
      <Item>
        <Headline>{headline}</Headline>
      </Item>
      {children}
      <motion.form
        key={declines}
        initial={declines ? { x: 0 } : { opacity: 0, y: 20 }}
        animate={declines ? { x: [0, -14, 14, -10, 10, -5, 5, 0] } : { opacity: 1, y: 0 }}
        transition={declines ? { duration: 0.5 } : { delay: 1.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8"
        onSubmit={(e) => {
          e.preventDefault()
          if (valid) onSubmit(value)
        }}
      >
        <Glass className="p-5">
          <label htmlFor="phone" className="text-sm font-medium text-plum-soft">
            {content.phoneInput.label}
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="off"
            value={value}
            onChange={(e) => setValue(formatPhone(e.target.value))}
            placeholder={content.phoneInput.placeholder}
            className="mt-2 w-full border-0 border-b-2 border-rose bg-transparent pb-2 font-display text-3xl text-plum placeholder:text-plum-soft/30 focus:border-pink focus:outline-none"
          />
        </Glass>
        <Button type="submit" disabled={!valid} className="mt-5">
          {buttonLabel}
        </Button>
        {dbEnabled && <p className="mt-3 text-center text-sm text-plum-soft/80">{content.phoneInput.note}</p>}
        <button
          type="button"
          onClick={() => setDeclines((n) => n + 1)}
          className="mt-4 w-full rounded-full px-4 py-3 text-center text-sm text-plum-soft underline decoration-rose underline-offset-4 focus-visible:ring-4 focus-visible:ring-pink/30 focus-visible:outline-none"
        >
          {decline.button}
        </button>
        <div className="mt-1 min-h-6 text-center" aria-live="polite">
          <AnimatePresence mode="wait">
            {declines > 0 && (
              <motion.p
                key={declines}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-display text-lg text-berry italic"
              >
                {decline.rejects[Math.min(declines, decline.rejects.length) - 1]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.form>
    </Screen>
  )
}

/** Shown after the number is saved on the phone path: pick where to go. */
export function VenuePickScreen({ onPick }: { onPick: (v: Venue) => void }) {
  const c = content.phonePath.done
  return (
    <Screen>
      <Item>
        <Headline>{c.headline}</Headline>
      </Item>
      <Item className="mt-6">
        <p className="text-lg leading-relaxed text-plum">{c.line}</p>
      </Item>
      <Item className="mt-3">
        <p className="text-sm text-plum-soft/80">{c.small}</p>
      </Item>
      <Item className="mt-8 grid grid-cols-2 gap-4">
        {c.venues.map((v) => (
          <motion.button
            key={v.id}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onPick(v.id)}
            className="flex min-h-32 flex-col items-center justify-center gap-2 rounded-3xl border border-white/80 bg-cream/70 shadow-[0_16px_40px_-28px_rgba(139,36,86,0.5)] backdrop-blur-xl transition-colors hover:border-pink/50 focus-visible:ring-4 focus-visible:ring-pink/30 focus-visible:outline-none"
          >
            <span className="text-4xl" aria-hidden>
              {v.icon}
            </span>
            <span className="font-display text-xl font-semibold text-plum">{v.label}</span>
          </motion.button>
        ))}
      </Item>
    </Screen>
  )
}
