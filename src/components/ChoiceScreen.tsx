import { useState } from 'react'
import { content, type Choice } from '../content'
import ChoiceCard from './ChoiceCard'
import { Body, Headline, Item, Screen } from './ui'

type Props = {
  onHover: (id: Choice | null) => void
  onChoose: (id: Choice) => void
}

export default function ChoiceScreen({ onHover, onChoose }: Props) {
  const c = content.choice
  const [selected, setSelected] = useState<Choice | null>(null)

  const select = (id: Choice) => {
    setSelected(id)
    onHover(id)
    // Let the selected card expand and the others fade before moving on.
    window.setTimeout(() => onChoose(id), 700)
  }

  return (
    <Screen wide>
      <Item className="mx-auto max-w-md text-center sm:max-w-xl">
        <Headline>{c.headline}</Headline>
        <Body className="mt-4">{c.sub}</Body>
      </Item>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {c.options.map((option) => (
          <ChoiceCard
            key={option.id}
            option={option}
            state={selected === null ? 'idle' : selected === option.id ? 'selected' : 'faded'}
            onHover={(id) => selected === null && onHover(id)}
            onSelect={select}
          />
        ))}
      </div>
    </Screen>
  )
}
