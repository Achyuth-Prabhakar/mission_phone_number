import { content, type Venue } from './content'

// Saves what Karlie submits as a row in the owner's Supabase table. The anon key can only insert;
// it cannot read anything back. Errors are swallowed so a network problem never breaks her experience.
export const dbEnabled = Boolean(content.db.url && content.db.anonKey)

type Row = { kind: 'number' | 'date'; phone: string; place?: string; activity?: string; day?: string }

async function save(row: Row) {
  if (!dbEnabled) return
  try {
    await fetch(`${content.db.url.replace(/\/$/, '')}/rest/v1/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: content.db.anonKey,
        Authorization: `Bearer ${content.db.anonKey}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(row),
      keepalive: true,
    })
  } catch {
    /* offline or blocked: ignore */
  }
}

export const saveNumber = (phone: string, venue?: Venue) =>
  save({ kind: 'number', phone, place: venue ? content.venueLabels[venue] : undefined })

export const saveDate = (phone: string, venue: Venue, day: string, activity: string) =>
  save({
    kind: 'date',
    phone,
    place: content.venueLabels[venue],
    activity: venue === 'bucket' ? activity : undefined,
    day,
  })
