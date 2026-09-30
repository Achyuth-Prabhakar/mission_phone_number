import { content } from '../content'
import { Body, Button, Headline, Item, Screen } from './ui'

export default function ProblemScreen({ onNext }: { onNext: () => void }) {
  const c = content.problem
  return (
    <Screen>
      <Item>
        <Headline>{c.headline}</Headline>
      </Item>
      <Item className="mt-6">
        <Body className="font-medium text-plum">{c.lines[0]}</Body>
      </Item>
      <Item className="mt-3">
        <Body>{c.lines[1]}</Body>
      </Item>
      <Item className="mt-5">
        <p className="inline-block -rotate-1 rounded-full bg-rose-soft px-4 py-1.5 font-display text-base text-berry italic">
          {c.aside}
        </p>
      </Item>
      <Item className="mt-5">
        <Body className="text-plum">{c.closer}</Body>
      </Item>
      <Item className="mt-10">
        <Button onClick={onNext}>{c.button}</Button>
      </Item>
    </Screen>
  )
}
