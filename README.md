# Mission Phone Number

A short, playful, mobile-first microsite for Karlie. React, TypeScript, Tailwind CSS and Framer Motion.

Flow: intro → the problem → choose your next move (number / beach / coffee) → number → pick a day → final plan.

```
npm install
npm run dev      # local preview
npm run build    # static site in dist/
```

- **Copy** lives in `src/content.ts`. Change the wording there.
- **Saving her answers:** when Karlie saves her number, and again when she picks a day, the page adds a row to a Supabase table (`supabase.sql`). Fill in `db.url` and `db.anonKey` in `src/content.ts`. With both empty, nothing is sent. The anon key can only add rows; only you can read them, in the Supabase dashboard (Table Editor → `events`). The page shows "This goes straight to me." only when this is on. No analytics.
- **Optional "Text me" button:** set `textMe.number` in `src/content.ts` to your number. The final screen then shows a button that opens Karlie's messages app with a prefilled text to you. She decides whether to send it. Leave it empty to hide the button.
