# inventory-management-system

This repository contains an Inventory Management System with a `backend` (Express + Prisma) and a `frontend` folder.

**This README explains how another developer can set up and start the project locally.**

**Prerequisites**
- Node.js (recommended v18 or later) and `npm` installed. Verify with `node -v` and `npm -v`.
- PostgreSQL (or a hosted Postgres) if you want to run the real database locally. You can also use a hosted DB URL.
- Optional: `nvm` / `nvm-windows` for Node version management.

--

## Clone

```powershell
git clone <repository-url>
cd inventory-management-system
```

## Backend (Express + Prisma)

1. Change to the backend folder

```powershell
cd backend
```

2. Install dependencies

```powershell
npm install
```

3. Create environment variables

Create a `.env` file inside the `backend` folder with at least the `DATABASE_URL` variable. Example:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
JWT_SECRET=your_jwt_secret_here
PORT=3000
```

Replace the values with your database credentials.

4. Generate Prisma client and push the schema to the database

If you want to use migrations (produces migration files) and have a writable Postgres available:

```powershell
npx prisma migrate dev --name init
```

If you just want to sync the Prisma schema to the database (no migration files):

```powershell
npx prisma db push
```

Also generate the Prisma client (the project includes `@prisma/client`):

```powershell
npx prisma generate
```

5. Start the backend

For development (auto-restarts using `nodemon`):

```powershell
npm run dev
```

For production (node):

```powershell
npm start
```

By default the backend listens on the port in `process.env.PORT` (or `3000` if not set). Visit `http://localhost:3000/health` (or the configured route) to verify the server is up.

## Frontend

The repository contains a `frontend` folder. Typical steps for the frontend (adjust if your frontend uses a specific framework):

```powershell
cd frontend
npm install
npm run dev   # or `npm start` depending on `package.json`
```

If the `frontend` needs a specific env file, create `.env` inside the `frontend` folder and set API base URLs accordingly (for example `REACT_APP_API_URL=http://localhost:3000`).

## Common troubleshooting
- If `node` or `npm` is not found: install Node or ensure the bin folder is on your PATH.
- If Prisma commands fail: confirm `DATABASE_URL` is correct and Postgres is reachable.
- If ports conflict: change `PORT` in `.env` or stop the process using that port.
- If you previously tried `nest new .` and scaffolded files are present, remove them before initializing a backend scaffold (you can back them up first).

## Commits and development workflow
- Create a feature branch: `git checkout -b feat/your-feature`
- Commit small changes and push to remote: `git add . && git commit -m "your message" && git push -u origin feat/your-feature`

## Next steps you might want me to do
- Add a `.env.example` file to the `backend` folder (I can create one for you).
- Add a short CONTRIBUTING or developer guide with commands for tests and linting.

---

