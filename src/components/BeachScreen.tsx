import { content } from '../content'
import PhoneNumberScreen from './PhoneNumberScreen'
import { Body, Item, Small } from './ui'

export default function BeachScreen({ onSubmit }: { onSubmit: (phone: string) => void }) {
  const c = content.beachPath
  return (
    <PhoneNumberScreen headline={c.headline} buttonLabel={c.button} onSubmit={onSubmit}>
      <Item className="mt-6">
        <Body className="font-medium text-plum">{c.line}</Body>
        <Small className="mt-1 italic">{c.small}</Small>
      </Item>
      <Item className="mt-4">
        <Body>{c.agree}</Body>
      </Item>
      <Item className="mt-3">
        <Body className="text-plum">{c.ask}</Body>
      </Item>
    </PhoneNumberScreen>
  )
}
