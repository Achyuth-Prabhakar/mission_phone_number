import { content } from '../content'
import PhoneNumberScreen from './PhoneNumberScreen'
import { Body, Item } from './ui'

export default function CoffeeScreen({ onSubmit }: { onSubmit: (phone: string) => void }) {
  const c = content.coffeePath
  return (
    <PhoneNumberScreen headline={c.headline} buttonLabel={c.button} onSubmit={onSubmit}>
      <Item className="mt-6">
        <Body className="font-medium text-plum">{c.line}</Body>
      </Item>
      <Item className="mt-3">
        <Body className="text-plum">{c.ask}</Body>
      </Item>
    </PhoneNumberScreen>
  )
}
