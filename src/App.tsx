import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Background, { type Tint } from './components/Background'
import BeachScreen from './components/BeachScreen'
import ChoiceScreen from './components/ChoiceScreen'
import CoffeeScreen from './components/CoffeeScreen'
import DateScreen from './components/DateScreen'
import FinalScreen from './components/FinalScreen'
import IntroScreen from './components/IntroScreen'
import PhoneNumberScreen, { VenuePickScreen } from './components/PhoneNumberScreen'
import ProblemScreen from './components/ProblemScreen'
import { Body, Item } from './components/ui'
import { content, type Choice, type Venue } from './content'

type Step = 'intro' | 'problem' | 'choice' | 'phone' | 'venue' | 'beach' | 'coffee' | 'date' | 'final'

export default function App() {
  const [step, setStep] = useState<Step>('intro')
  const [tint, setTint] = useState<Tint>('default')
  const [venue, setVenue] = useState<Venue>('coffee')
  const [day, setDay] = useState('')
  // Kept in React state only, on purpose: it is never sent, stored or logged anywhere.
  const [, setPhone] = useState('')

  const choose = (id: Choice) => setStep(id)
  const pickVenue = (v: Venue) => {
    setVenue(v)
    setStep('date')
  }

  return (
    <>
      <Background tint={tint} />
      <AnimatePresence mode="wait">
        {step === 'intro' && <IntroScreen key="intro" onNext={() => setStep('problem')} />}
        {step === 'problem' && <ProblemScreen key="problem" onNext={() => setStep('choice')} />}
        {step === 'choice' && (
          <ChoiceScreen key="choice" onHover={(id) => setTint(id ?? 'default')} onChoose={choose} />
        )}
        {step === 'phone' && (
          <PhoneNumberScreen
            key="phone"
            headline={content.phonePath.headline}
            buttonLabel={content.phonePath.button}
            onSubmit={(p) => {
              setPhone(p)
              setStep('venue')
            }}
          >
            <Item className="mt-6">
              <Body>{content.phonePath.line}</Body>
            </Item>
          </PhoneNumberScreen>
        )}
        {step === 'venue' && <VenuePickScreen key="venue" onPick={pickVenue} />}
        {step === 'beach' && (
          <BeachScreen
            key="beach"
            onSubmit={(p) => {
              setPhone(p)
              pickVenue('beach')
            }}
          />
        )}
        {step === 'coffee' && (
          <CoffeeScreen
            key="coffee"
            onSubmit={(p) => {
              setPhone(p)
              pickVenue('coffee')
            }}
          />
        )}
        {step === 'date' && (
          <DateScreen
            key="date"
            venue={venue}
            onSubmit={(d) => {
              setDay(d)
              setTint(venue)
              setStep('final')
            }}
          />
        )}
        {step === 'final' && <FinalScreen key="final" venue={venue} day={day} />}
      </AnimatePresence>
    </>
  )
}
