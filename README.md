# Lang Flashcards

**Vuelta** is a mobile-first Spanish–English flashcard app for building a personal vocabulary library and practicing it in either direction.

## Features

- Spanish → English, English → Spanish, and mixed-direction quizzes
- Practice one topic or shuffle the complete library
- Searchable card library with color-coded groups
- Admin tools for creating, editing, and deleting cards and groups
- Responsive card-flip interface with Safari/WebKit support
- SQLite-compatible persistence with Cloudflare D1 and Drizzle ORM
- Starter vocabulary that is added automatically to an empty database

## Stack

- React 19
- TypeScript
- Vinext / Next.js-compatible app routing
- Tailwind CSS
- Cloudflare Workers and D1
- Drizzle ORM

## Run locally

Requirements: Node.js 22.13 or newer.

```bash
npm ci
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_free_gorilla_man.sql
npm run dev
```

Open [http://127.0.0.1:5173](http://127.0.0.1:5173). The first visit seeds the local database with a small example collection.

Local D1 data is stored under `.wrangler/` and is not committed.

## Useful commands

```bash
npm run dev          # Start the development server
npm run build        # Create a production build
npm run db:generate  # Generate migrations after schema changes
npm exec tsc -- --noEmit
```

## Project structure

- `app/` — routes, API endpoints, and global styles
- `features/quiz/` — quiz setup, flashcard, and scoring flow
- `features/library/` — card types, data hook, and library UI
- `features/admin/` — card and group management
- `db/` — D1 connection and Drizzle schema
- `drizzle/` — generated SQL migrations

## Hosting

The original instance is deployed privately with OpenAI Sites. The app targets Cloudflare Workers and uses D1 for hosted persistence.

## License

[MIT](LICENSE)
