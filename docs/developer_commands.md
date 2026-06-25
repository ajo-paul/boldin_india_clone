# Developer Commands

This document contains standard commands for developing, testing, and deploying the application.

## Setup
```bash
# Install dependencies
npm install

# Setup local environment variables
cp .env.example .env.local
```

## Development
```bash
# Run the local development server
npm run dev

# Run ESLint to check for code quality issues
npm run lint

# Format code using Prettier
npm run format
```

## Testing
```bash
# Run all unit tests (Critical for financial calculators)
npm run test

# Run tests in watch mode
npm run test:watch

# Run end-to-end tests
npm run test:e2e
```

## Database (Supabase)
```bash
# Start local Supabase instance
npx supabase start

# Generate TypeScript types from database schema
npx supabase gen types typescript --local > types/supabase.ts

# Push local database changes to remote Supabase project
npx supabase db push
```

## Build & Deploy
```bash
# Build for production
npm run build

# Start production server locally
npm run start
```
