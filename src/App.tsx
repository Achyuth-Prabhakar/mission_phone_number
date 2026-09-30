import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Background, { type Tint } from './components/Background'
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
  // True once she has typed her number. The number itself is not kept: it is never sent or stored.
  // It reaches the owner only if she sends the prefilled text on the final screen.
  const [gaveNumber, setGaveNumber] = useState(false)

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

  const choose = (id: Choice) => go(id)
  const goDate = (v: Venue) => {
    setVenue(v)
    go('date')
  }
  const gotNumber = (v: Venue) => {
    setGaveNumber(true)
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
            onSubmit={() => {
              setGaveNumber(true)
              go('venue')
            }}
          >
            <Item className="mt-6">
              <Body>{content.phonePath.line}</Body>
            </Item>
          </PhoneNumberScreen>
        )}
        {step === 'venue' && <VenuePickScreen key="venue" onPick={pickVenue} />}
        {step === 'beach' && <BeachScreen key="beach" onSubmit={() => gotNumber('beach')} />}
        {step === 'coffee' && <CoffeeScreen key="coffee" onSubmit={() => gotNumber('coffee')} />}
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
            onSubmit={() => gotNumber('bucket')}
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
