import { useState } from 'react'
import { content, type Venue } from '../content'
import { BeachScene, BucketScene, CoffeeScene } from './Scenes'
import { Body, Button, Glass, Headline, Item, Screen } from './ui'

const today = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

export default function DateScreen({ venue, activity, onSubmit }: { venue: Venue; activity: string; onSubmit: (day: string) => void }) {
  const c = content.date
  const [day, setDay] = useState('')

  return (
    <Screen>
      <Item>
        <Headline>{c.headline}</Headline>
        <p className="mt-3 font-display text-2xl text-berry italic">{c.unlocked[venue]}</p>
      </Item>
      <Item className="mt-6">{venue === 'beach' ? <BeachScene /> : venue === 'coffee' ? <CoffeeScene /> : <BucketScene activity={activity} />}</Item>
      <Item className="mt-6">
        <Body className="text-plum">{c.ask}</Body>
      </Item>
      <Item className="mt-4">
        <Glass className="p-5">
          <label htmlFor="day" className="text-sm font-medium text-plum-soft">
            {c.label}
          </label>
          <input
            id="day"
            type="date"
            min={today()}
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="mt-2 block w-full border-0 border-b-2 border-rose bg-transparent pb-2 font-display text-2xl text-plum focus:border-pink focus:outline-none"
          />
        </Glass>
      </Item>
      <Item className="mt-5">
        <Button disabled={!day} onClick={() => onSubmit(day)}>
          {c.button}
        </Button>
      </Item>
    </Screen>
  )
}
