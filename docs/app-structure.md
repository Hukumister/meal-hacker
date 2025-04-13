# Application Structure Documentation

## Project Overview
This is a Next.js application using TypeScript, Prisma for database operations, and various modern React patterns and tools.

## Directory Structure

```
src/
├── app/                    # Next.js app directory (routes and pages)
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── [feature]/        # Feature-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and shared code
├── models/              # Database models and operations
└── types/                # TypeScript type definitions
```

## Core Technologies

### Frontend
- Next.js 15.3.0
- React 18.3.1
- TypeScript
- TailwindCSS
- Radix UI Components

### Backend & Database
- Prisma ORM
- Database (specified in schema)
- Next.js API Routes

### Development Tools
- ESLint
- TypeScript
- PostCSS
- Tailwind

## Key Components

### 1. App Directory (`src/app/`)
- Page components
- Layout components
- Route handlers
- API endpoints

### 2. Components (`src/components/`)

#### UI Components (`components/ui/`)
- Buttons
- Forms
- Inputs
- Modals
- Navigation
- Tables

#### Feature Components (`components/[feature]/`)
- Feature-specific implementations
- Business logic components
- Complex UI compositions

### 3. Hooks (`src/hooks/`)
- `useFilters` - URL-synchronized filter management
- `useMobile` - Mobile detection and responsive handling
- Other custom hooks

### 4. Library (`src/lib/`)
- Utility functions
- Helper methods
- Constants
- Configuration

### 5. Types (`src/types/`)
- TypeScript interfaces
- Type definitions
- Shared types

## State Management

### URL State
- Filter states
- Pagination
- Search parameters

### Local State
- Form states
- UI states
- Component-level states

## Routing Structure

```
app/
├── layout.tsx           # Root layout
├── page.tsx            # Home page
├── [feature]/          # Feature routes
│   ├── layout.tsx     # Feature layout
│   ├── page.tsx       # Feature main page
│   └── [id]/          # Dynamic routes
└── api/               # API routes
```

## Component Patterns

### 1. Client Components
```typescript
"use client"

import { useState } from "react"

export function ClientComponent() {
    const [state, setState] = useState()
    // Component logic
}
```

### 2. Server Components
```typescript
export function ServerComponent() {
    // Server-side logic
    return <div>Server Rendered Content</div>
}
```

### 3. Layout Components
```typescript
export function FeatureLayout({ children }) {
    return (
        <div className="layout-wrapper">
            <Sidebar />
            <main>{children}</main>
        </div>
    )
}
```

## Data Flow

### 1. API Requests
```typescript
async function fetchData() {
    const response = await fetch('/api/endpoint')
    return response.json()
}
```

### 2. Database Operations
```typescript
// Using Prisma Client
const data = await prisma.model.findMany({
    where: {
        // query conditions
    }
})
```

## Best Practices

### File Naming
- Use kebab-case for files: `feature-name.tsx`
- Use PascalCase for components: `FeatureName`
- Use camelCase for utilities functions: `utilityName`

### Component Organization
- Group related components
- Keep components focused and single-responsibility
- Use composition over inheritance

### Code Style
- Use TypeScript for type safety
- Follow ESLint rules
- Use consistent formatting
- Write meaningful comments

### Performance
- Use proper code splitting
- Implement lazy loading
- Optimize images and assets
- Monitor bundle size

## Development Workflow

### 1. Starting Development
```bash
npm run dev
```

### 2. Building for Production
```bash
npm run build
```

## Database Organization

### Models Directory Structure
```
src/models/
├── first-db-item.ts    
└── another-db-item.ts 
```