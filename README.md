# FitLog Workout Library

A responsive workout library and training log built from the FitLog API. The interface follows a dark, high-contrast gym aesthetic with acid-green accents and a mobile-first layout.

## Technologies

- Next.js 15 with App Router
- React 19
- TypeScript
- Tailwind CSS
- Lucide React icons
- FitLog REST API
- localStorage for plan/saved persistence

## Features

1. Responsive workout library with 12 API-driven workouts.
2. Workout detail pages with specs, instructions, and action buttons.
3. Today's Plan with a five-workout cap and live metrics.
4. Saved workouts tab with persistent localStorage state.
5. Mark as Done and Remove actions with toast notifications.
6. Duration, calories, and rating sorting.
7. Loading states, API fallback, and custom 404 page.
8. Responsive navbar counters and mobile navigation.
9. Deployment-safe App Router routes for Vercel/Netlify-style hosting.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm start
```

## API

Primary: `https://api.abcz.workers.dev/api/fitlog`

Fallback: `https://api.api-store.workers.dev/api/fitlog`

## Deployment

The project is ready for Vercel. Import the repository, keep the default Next.js build settings, and deploy.
