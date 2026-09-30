import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Background, { type Tint } from './components/Background'
import Trail from './components/Trail'
import BeachScreen from './components/BeachScreen'
import BucketScreen from './components/BucketScreen'
import ChoiceScreen from './components/ChoiceScreen'
import CoffeeScreen from './components/CoffeeScreen'
import DateScreen from './components/DateScreen'
import FinalScreen from './components/FinalScreen'
import IntroScreen from './components/IntroScreen'
import PhoneNumberScreen, { VenuePickScreen } from './components/PhoneNumberScreen'
import ProblemScreen from './components/ProblemScreen'
import { Body, Item } from './components/ui'
import { content, type Choice, type Venue } from './content'
import { saveDate, saveNumber } from './notify'

type Step =
  | 'intro'
  | 'problem'
  | 'choice'
  | 'phone'
  | 'venue'
  | 'beach'
  | 'coffee'
  | 'bucket'
  | 'bucketPhone'
  | 'date'
  | 'final'

export default function App() {
  const [step, setStep] = useState<Step>('intro')
  const [trail, setTrail] = useState<Step[]>([])
  const [tint, setTint] = useState<Tint>('default')
  const [venue, setVenue] = useState<Venue>('coffee')
  const [activity, setActivity] = useState('')
  const [day, setDay] = useState('')
  const [phone, setPhone] = useState('')
  const gaveNumber = phone !== ''

  // Every forward move records where she came from, so the back button can retrace it.
  const go = (next: Step) => {
    setTrail((t) => [...t, step])
    setStep(next)
  }
  const back = () => {
    const prev = trail[trail.length - 1]
    if (!prev) return
    setTrail((t) => t.slice(0, -1))
    setTint('default')
    setStep(prev)
  }

  const reached = { intro: 0, problem: 1, choice: 1, phone: 2, venue: 2, beach: 2, coffee: 2, bucket: 2, bucketPhone: 2, date: 3, final: 4 }[step]

  const choose = (id: Choice) => go(id)
  const goDate = (v: Venue) => {
    setVenue(v)
    go('date')
  }
  const gotNumber = (p: string, v: Venue) => {
    setPhone(p)
    void saveNumber(p, v)
    goDate(v)
  }
  const pickVenue = (v: Venue) => {
    if (v === 'bucket') {
      setVenue('bucket')
      go('bucket')
    } else {
      goDate(v)
    }
  }

  return (
    <>
      <Background tint={tint} />
      {/* A soft pink ripple sweeps up from the bottom on every page change. */}
      {(trail.length > 0 || step !== 'intro') && (
        <motion.div
          key={step}
          aria-hidden
          className="pointer-events-none fixed bottom-0 left-1/2 z-30 h-[60vmax] w-[60vmax] -translate-x-1/2 translate-y-1/2 rounded-full bg-pink/25"
          initial={{ scale: 0, opacity: 0.9 }}
          animate={{ scale: 2.4, opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
      {step !== 'intro' && <Trail reached={reached} />}
      {step !== 'intro' && (
        <motion.button
          type="button"
          onClick={back}
          aria-label="Back"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          whileTap={{ scale: 0.92 }}
          className="fixed top-4 left-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-cream/70 text-plum shadow-[0_8px_24px_-12px_rgba(139,36,86,0.5)] backdrop-blur-xl transition-colors hover:border-pink/50 focus-visible:ring-4 focus-visible:ring-pink/30 focus-visible:outline-none"
          style={{ marginTop: 'env(safe-area-inset-top, 0px)' }}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </motion.button>
      )}
      <AnimatePresence mode="wait">
        {step === 'intro' && <IntroScreen key="intro" onNext={() => go('problem')} />}
        {step === 'problem' && <ProblemScreen key="problem" onNext={() => go('choice')} />}
        {step === 'choice' && (
          <ChoiceScreen
            key="choice"
            onHover={(id) => setTint(id === 'bucket' ? 'default' : (id ?? 'default'))}
            onChoose={choose}
          />
        )}
        {step === 'phone' && (
          <PhoneNumberScreen
            key="phone"
            headline={content.phonePath.headline}
            buttonLabel={content.phonePath.button}
            onSubmit={(p) => {
              setPhone(p)
              void saveNumber(p)
              go('venue')
            }}
          >
            <Item className="mt-6">
              <Body>{content.phonePath.line}</Body>
            </Item>
          </PhoneNumberScreen>
        )}
        {step === 'venue' && <VenuePickScreen key="venue" onPick={pickVenue} />}
        {step === 'beach' && <BeachScreen key="beach" onSubmit={(p) => gotNumber(p, 'beach')} />}
        {step === 'coffee' && <CoffeeScreen key="coffee" onSubmit={(p) => gotNumber(p, 'coffee')} />}
        {step === 'bucket' && (
          <BucketScreen
            key="bucket"
            onSubmit={(a) => {
              setActivity(a)
              // Number already given on the phone-first path, otherwise ask for it next.
              if (gaveNumber) goDate('bucket')
              else go('bucketPhone')
            }}
          />
        )}
        {step === 'bucketPhone' && (
          <PhoneNumberScreen
            key="bucketPhone"
            headline={content.bucketPath.phoneHeadline}
            buttonLabel={content.bucketPath.phoneButton}
            onSubmit={(p) => gotNumber(p, 'bucket')}
          >
            <Item className="mt-6">
              <Body className="font-medium text-plum">{content.bucketPath.phoneLine}</Body>
            </Item>
            <Item className="mt-3">
              <Body className="text-plum">{content.bucketPath.phoneAsk}</Body>
            </Item>
          </PhoneNumberScreen>
        )}
        {step === 'date' && (
          <DateScreen
            key="date"
            venue={venue}
            activity={activity}
            onSubmit={(d) => {
              setDay(d)
              void saveDate(phone, venue, d, activity)
              setTint(venue === 'bucket' ? 'default' : venue)
              go('final')
            }}
          />
        )}
        {step === 'final' && <FinalScreen key="final" venue={venue} day={day} activity={activity} />}
      </AnimatePresence>
    </>
  )
}
