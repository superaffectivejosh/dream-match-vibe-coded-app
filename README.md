# Dream Match ✨🔮

A stylish Next.js prototype for a dating experience that returns exactly **one** match.

No endless swiping. No dozens of conversations. Just one dreamy reveal.

## What is in this repo

- Next.js App Router app
- Fully working front-end flow
- Client-side onboarding, processing, and match reveal
- No shadcn dependency
- Vercel-ready project structure

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

### GitHub route

```bash
git init
git add .
git commit -m "Initial Dream Match repo"
```

Push to GitHub, then import the repo into Vercel.

### Vercel CLI route

```bash
npm i -g vercel
vercel
vercel --prod
```

## Important implementation note

The interactive app lives in `components/DreamMatchApp.tsx` and is marked with `"use client"` because interactive UI with hooks must be a Client Component in the App Router.

## Suggested next steps

- Add Supabase auth
- Add real age verification
- Save profiles and consent records
- Replace demo matching logic with a real scoring / embeddings pipeline
- Add report / block flows
- Add a post-match intro screen with scheduling
