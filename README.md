# Meal Hacker

A recipe management and meal planning application.

## Getting Started

First, run the development server:

```bash
npm install
```

```bash
npx prisma generate
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Database Setup

### Prerequisites

- Node.js (v18 or higher)
- SQLite (included in the project)

### Setup Steps

1. **Install dependencies**

```bash
npm install
```

2. **Configure environment variables**

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL="file:./dev.db"
```

3. **Generate Prisma client**

```bash
npx prisma generate
```

4. **Run database migrations**

```bash
npx prisma migrate dev
```

This will create the database tables according to the schema defined in `prisma/schema.prisma`.

5. **Seed the database**

```bash
npm run seed
```

This will populate the database with initial settings, including the recipe extraction prompt.

## Features

- Recipe management
- Automatic recipe extraction from text
- Nutrition tracking
