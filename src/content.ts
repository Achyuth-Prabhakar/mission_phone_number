// Every word on the site lives here, so the copy can be changed without touching components.

export type Venue = 'beach' | 'coffee' | 'bucket'
export type Choice = 'phone' | Venue

export const content = {
  name: 'Karlie',

  intro: {
    headline: ['Are you ready?', 'Karlie.', 'It’s time.'],
    accentWord: 'It’s time.',
    sub: 'Time to take the next step.',
    button: 'Okay… I’m listening',
    // Tapping the highlighted words makes them squirm and shows one of these.
    pokes: ['Yes, now.', 'No, really. Now.', 'Okay, you’re ready.'],
  },

  problem: {
    headline: 'Here’s the thing…',
    lines: [
      'I’d love to get a notification saying I got a message from Karlie.',
      'But I feel like Instagram DMs are starting to become an unnecessarily complicated way to get to know someone.',
    ],
    aside: 'Technology has failed us.',
    closer: 'So I came up with a solution.',
    button: 'Show me.',
  },

  choice: {
    headline: 'Choose your next move.',
    sub: 'I’ve narrowed it down to four very reasonable options.',
    options: [
      {
        id: 'phone',
        icon: '📱',
        title: 'Give me your number.',
        description: 'We can skip the middleman.',
        small: 'Simple. Efficient. Slightly bold.',
        button: 'Seems reasonable',
      },
      {
        id: 'beach',
        icon: '🏖',
        title: 'Let’s go to the beach.',
        description: 'Because apparently we’re skipping several steps.',
        small: 'I’m not complaining.',
        button: 'I’m listening…',
      },
      {
        id: 'coffee',
        icon: '☕',
        title: 'Let’s get coffee or chai.',
        description: 'A much more normal proposal.',
        small: 'We can pretend we’re being casual about this.',
        button: 'Coffee/chai sounds good',
      },
      {
        id: 'bucket',
        icon: '✅',
        title: 'Got something on your bucket list?',
        description: 'Something you’ve been wanting to tick off? Click here and tell me more.',
        small: 'I’m in, as long as it’s legal.',
        button: 'Tell me more',
      },
    ] satisfies { id: Choice; icon: string; title: string; description: string; small: string; button: string }[],
  },

  phoneInput: {
    label: 'Your number:',
    placeholder: '(555) 555-5555',
    // Shown under the number box only when the database below is configured.
    note: 'This goes straight to me. Nobody else.',
    // A joke escape hatch: it shakes the screen and always says no.
    decline: {
      button: 'Don’t want to give your number? Click here to continue.',
      rejects: [
        'Invalid choice.',
        'Still invalid.',
        'That option does not exist.',
        'I would love to be blessed by your number.',
      ],
    },
  },

  phonePath: {
    headline: 'Excellent choice.',
    line: 'Honestly, I was hoping you’d pick this one.',
    button: 'Save my number →',
    done: {
      headline: 'And just like that…',
      line: 'Instagram has officially been promoted to phone number status.',
      small: 'Now we just need to decide where we’re going.',
      venues: [
        { id: 'beach', icon: '🏖', label: 'Beach' },
        { id: 'coffee', icon: '☕', label: 'Coffee or chai' },
        { id: 'bucket', icon: '✅', label: 'Bucket list' },
      ] satisfies { id: Venue; icon: string; label: string }[],
    },
  },

  beachPath: {
    headline: 'Oh.',
    line: 'We’re skipping straight to the beach?',
    small: 'I respect the confidence.',
    agree: 'Okay, I’m in.',
    ask: 'Now I just need your number so we can actually make this happen.',
    button: 'Let’s go →',
  },

  coffeePath: {
    headline: 'Okay, we’re being normal.',
    line: 'I can work with that.',
    ask: 'But I still need your number.',
    button: 'Coffee it is →',
  },

  // Supabase project that stores what she submits (see supabase.sql and the README).
  // Both values are public by design (the anon key can only add rows). Leave them empty to send nothing.
  db: {
    url: '',
    anonKey: '',
  },

  venueLabels: {
    beach: 'Beach',
    coffee: 'Coffee or chai',
    bucket: 'Bucket list',
  } satisfies Record<Venue, string>,

  bucketPath: {
    headline: 'Ooh, a bucket list.',
    line: 'Okay, I’m intrigued.',
    ask: 'What’s one thing you’ve been wanting to do?',
    label: 'Your bucket list item',
    placeholder: 'A night market, a road trip, stargazing…',
    button: 'Add it to the list →',
    phoneHeadline: 'Noted.',
    phoneLine: 'Good one.',
    phoneAsk: 'Now I need your number so we can actually tick it off.',
    phoneButton: 'Let’s do it →',
  },

  date: {
    headline: 'Perfect.',
    unlocked: {
      beach: 'Beach date unlocked.',
      coffee: 'Coffee (or chai) date unlocked.',
      bucket: 'Bucket list item unlocked.',
    } satisfies Record<Venue, string>,
    ask: 'Now we just need a day.',
    label: 'Pick a day',
    button: 'Make it happen →',
  },

  final: {
    headline: 'Well, Karlie…',
    line: 'Looks like we have a plan.',
    steps: [
      { label: 'Tinder', done: true },
      { label: 'Instagram', done: true },
      { label: 'Phone', done: true },
      { label: 'Date', done: false },
    ],
    notBad: 'Not bad.',
    closer: 'I’ll see you soon :)',
  },

  // Optional: put your own number here (e.g. '+15551234567') to show a "Text me" button on the
  // final screen. It opens Karlie's messages app with a prefilled text to you; she decides
  // whether to send it. Leave it empty and the button stays hidden.
  textMe: {
    number: '+17732806983',
    button: 'Text me so I have yours →',
    message: (venue: Venue, day: string, activity: string) => {
      const what = venue === 'bucket' ? (activity ? `Bucket list: ${activity}` : 'Bucket list') : venue === 'beach' ? 'Beach' : 'Coffee or chai'
      return `Hi, it's Karlie. ${what}${day ? ` on ${day}` : ''}. See you then :)`
    },
  },
}
