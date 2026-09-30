# Mission Phone Number

A short, playful, mobile-first microsite for Karlie. React, TypeScript, Tailwind CSS and Framer Motion.

Flow: intro → the problem → choose your next move (number / beach / coffee) → number → pick a day → final plan.

```
npm install
npm run dev      # local preview
npm run build    # static site in dist/
```

- **Copy** lives in `src/content.ts`. Change the wording there.
- **Privacy:** the phone number stays in React state only. No backend, database or analytics.
- **Optional "Text me" button:** set `textMe.number` in `src/content.ts` to your number. The final screen then shows a button that opens Karlie's messages app with a prefilled text to you. She decides whether to send it. Leave it empty to hide the button.
