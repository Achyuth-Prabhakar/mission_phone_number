import { AnimatePresence } from 'framer-motion'
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
  const [tint, setTint] = useState<Tint>('default')
  const [venue, setVenue] = useState<Venue>('coffee')
  const [activity, setActivity] = useState('')
  const [day, setDay] = useState('')
  // True once she has typed her number. The number itself is not kept: it is never sent or stored.
  // It reaches the owner only if she sends the prefilled text on the final screen.
  const [gaveNumber, setGaveNumber] = useState(false)

  const choose = (id: Choice) => setStep(id)
  const goDate = (v: Venue) => {
    setVenue(v)
    setStep('date')
  }
  const gotNumber = (v: Venue) => {
    setGaveNumber(true)
    goDate(v)
  }
  const pickVenue = (v: Venue) => {
    if (v === 'bucket') {
      setVenue('bucket')
      setStep('bucket')
    } else {
      goDate(v)
    }
  }

  return (
    <>
      <Background tint={tint} />
      <AnimatePresence mode="wait">
        {step === 'intro' && <IntroScreen key="intro" onNext={() => setStep('problem')} />}
        {step === 'problem' && <ProblemScreen key="problem" onNext={() => setStep('choice')} />}
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
              setStep('venue')
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
              else setStep('bucketPhone')
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
              setStep('final')
            }}
          />
        )}
        {step === 'final' && <FinalScreen key="final" venue={venue} day={day} activity={activity} />}
      </AnimatePresence>
    </>
  )
}
