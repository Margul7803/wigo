# Welcome to Wigo project

## Project info

**URL**: https://gist.github.com/Punkte/71aa7808c6b14896f2d6566633c9e519

Node version 22

**For dev Front-end purpose**

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <./frontEnd>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

**For dev Back-end purpose**

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

First have .env as the .env.exemple in the ./backEnd

DATABASE_URL="file:./dev.db" # Chemin vers la base de données SQLite  
GRAPHQL_ENDPOINT="http://localhost:4000/graphql" # URL de l'endpoint GraphQL

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <./backEnd>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Init prisma db and migrate
npx prisma migrate dev

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## What technologies are used for this project?

This project is built with:

- TypeScript
- GraphQl
- Prisma
