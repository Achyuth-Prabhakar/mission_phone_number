import { motion } from 'framer-motion'
import { content, type Venue } from '../content'
import { Body, Headline, Item, Screen } from './ui'

// Small drifting dots as a quiet celebration; fixed positions so layout never shifts.
const dots = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37 + 9) % 100}%`,
  size: 6 + ((i * 5) % 9),
  delay: (i % 7) * 0.25,
  duration: 3.2 + (i % 4) * 0.6,
}))

function formatDay(day: string) {
  if (!day) return ''
  const [y, m, d] = day.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })
}

export default function FinalScreen({ venue, day, activity }: { venue: Venue; day: string; activity: string }) {
  const c = content.final
  const t = content.textMe
  const pretty = formatDay(day)
  const sms = t.number ? `sms:${t.number}?&body=${encodeURIComponent(t.message(venue, pretty, activity))}` : ''

  return (
    <Screen>
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        {dots.map((dot, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-pink/40"
            style={{ left: dot.left, bottom: -20, width: dot.size, height: dot.size }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: '-110vh', opacity: [0, 0.8, 0] }}
            transition={{ duration: dot.duration, delay: dot.delay, ease: 'easeOut', repeat: 1, repeatDelay: 1.2 }}
          />
        ))}
      </div>

      <Item>
        <Headline>{c.headline}</Headline>
      </Item>
      <Item className="mt-4">
        <Body className="text-plum">{c.line}</Body>
      </Item>
      <Item className="mt-8">
        <ul className="space-y-2.5 rounded-3xl border border-white/80 bg-cream/70 p-5 backdrop-blur-xl">
          {c.steps.map((s) => (
            <li key={s.label} className="flex items-center justify-between font-display text-2xl text-plum">
              <span className={s.done ? '' : 'text-berry'}>{s.label}</span>
              <span className={s.done ? 'text-pink' : 'text-berry'}>{s.done ? '✓' : '→'}</span>
            </li>
          ))}
        </ul>
        {pretty && (
          <p className="mt-3 text-center text-sm text-plum-soft">
            {venue === 'bucket' && activity ? activity : content.venueLabels[venue]} · {pretty}
          </p>
        )}
      </Item>
      <Item className="mt-8">
        <Body>{c.notBad}</Body>
        <p className="mt-2 font-display text-3xl text-plum">{c.closer}</p>
      </Item>
      {sms && (
        <Item className="mt-8">
          <motion.a
            href={sms}
            whileTap={{ scale: 0.97 }}
            className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-pink px-7 text-[17px] font-medium text-white shadow-[0_10px_30px_-10px_rgba(214,51,111,0.7)] transition-colors hover:bg-pink-deep focus-visible:ring-4 focus-visible:ring-pink/30 focus-visible:outline-none"
          >
            {t.button}
          </motion.a>
        </Item>
      )}
    </Screen>
  )
}
