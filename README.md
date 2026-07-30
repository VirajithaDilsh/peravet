# Peravet

Farm management system for tracking animals, their health records, tasks, and production data. Built for veterinary doctors and farm staff at a teaching farm.

Frontend (this repo) is a Next.js app. It talks to a separate Express + MongoDB API — see [peravtf-express-backend](https://github.com/VirajithaDilsh/peravtf-express-backend).

## Features

- **Auth** — login/register, JWT-based sessions, role-based access (admin, doctor, student, employee)
- **Animals** — CRUD for Cattle, Buffalo, Pig, Goat, Sheep, Layer, Broiler, each with species-specific fields (reproduction info for mammals, flock size/mortality for poultry)
- **Health management** — per-animal Vaccination, Deworming, Disease, Feed, and Water tables
- **Tasks** — assignable to students/employees/doctors, with due/next dates, snooze, and complete/undo. Tasks and health-management tables stay in sync in both directions: creating a task adds a row to the matching health table, and saving a health table row creates a matching task
- **Production** — production record tracking per animal
- **Dashboard** — admin panel with animal/user distribution charts, user and animal management

## Tech Stack

- [Next.js](https://nextjs.org) 15 (App Router) + React 18 + TypeScript
- Tailwind CSS
- Axios for API calls
- Radix UI / shadcn-style components (`components/ui`), Headless UI comboboxes
- Recharts for dashboard charts

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Points at the [backend API](https://github.com/VirajithaDilsh/peravtf-express-backend) — run that separately (see its README) before using this app.

## Project Structure

```
src/
  app/
    animals/[tag]/       # Animal detail page (health tables, reproduction info, tasks)
    animals/edit/[tag]/  # Animal edit form
    dashboard/           # Admin panel, task list, add-task form
    login/, register/, forgotpassword/, profile/
  components/
    tables/               # Species-specific health management tables, users/task tables
    tasks/                # Task widgets (e.g. upcoming tasks card)
    ui/                   # Shared shadcn-style primitives (button, select, card, input)
  context/                # React context providers (Animal, Tasks, User, Production)
  services/               # Axios calls per resource (animalApi, taskApi, userApi, productionApi)
  lib/                    # Shared client-side helpers (axios instance, taskHealthSync)
  types/                  # Shared TypeScript types (animals, Task, users)
  config/api.ts           # API base URL and per-resource endpoint constants
```

### Task ↔ health table sync

`src/lib/taskHealthSync.ts` holds the mapping logic between `Task` records and the per-species health-management arrays (`vaccinations`, `deworming`, `diseases`, `feedManagement`, `waterManagement`):

- `appendTaskToHealthRecords` — called from the Add Task page after a task is created; appends the equivalent row to the animal's health table.
- `syncHealthRowsToTasks` — called from each species' health table component on Save; creates a Task for any row that doesn't already have a matching one (deduped by animal, type, dates, and comment so repeated saves don't create duplicates).

## Scripts

```bash
npm run dev     # start dev server
npm run build   # production build
npm run start   # run production build
npm run lint    # eslint
```

## Related

- Backend: [peravtf-express-backend](https://github.com/VirajithaDilsh/peravtf-express-backend) (Express + MongoDB API)
