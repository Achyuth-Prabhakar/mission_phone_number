import { useState } from 'react'
import { content } from '../content'
import { Body, Button, Glass, Headline, Item, Screen } from './ui'

/** She types what she wants to do; it stays in the page until the final text. */
export default function BucketScreen({ onSubmit }: { onSubmit: (activity: string) => void }) {
  const c = content.bucketPath
  const [text, setText] = useState('')
  const ok = text.trim().length > 1

  return (
    <Screen>
      <Item>
        <Headline>{c.headline}</Headline>
      </Item>
      <Item className="mt-6">
        <Body className="font-medium text-plum">{c.line}</Body>
      </Item>
      <Item className="mt-3">
        <Body className="text-plum">{c.ask}</Body>
      </Item>
      <Item className="mt-6">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (ok) onSubmit(text.trim())
          }}
        >
          <Glass className="p-5">
            <label htmlFor="bucket" className="text-sm font-medium text-plum-soft">
              {c.label}
            </label>
            <textarea
              id="bucket"
              rows={3}
              maxLength={140}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={c.placeholder}
              className="mt-2 w-full resize-none border-0 border-b-2 border-rose bg-transparent pb-2 font-display text-2xl leading-snug text-plum placeholder:text-plum-soft/30 focus:border-pink focus:outline-none"
            />
          </Glass>
          <Button type="submit" disabled={!ok} className="mt-5">
            {c.button}
          </Button>
        </form>
      </Item>
    </Screen>
  )
}
