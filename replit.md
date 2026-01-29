# replit.md

## Overview

This is a full-stack web application built with React frontend and Express backend. The project appears to be a landing page with a guestbook/messaging feature and a contact form. It follows a clean minimalist design aesthetic with ample whitespace and sans-serif typography.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Form Handling**: React Hook Form with Zod validation
- **Animations**: Framer Motion for smooth transitions
- **Build Tool**: Vite with custom path aliases (@/, @shared/, @assets/)

### Backend Architecture
- **Framework**: Express.js 5 running on Node.js
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful endpoints defined in shared/routes.ts
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Validation**: Zod schemas shared between frontend and backend via drizzle-zod

### Code Organization
```
client/          # React frontend application
  src/
    components/  # UI components (shadcn/ui library)
    hooks/       # Custom React hooks
    lib/         # Utility functions and query client
    pages/       # Page components
server/          # Express backend
  routes.ts      # API route handlers
  storage.ts     # Database access layer
  db.ts          # Database connection
shared/          # Shared code between frontend/backend
  schema.ts      # Drizzle database schemas and Zod types
  routes.ts      # API route definitions with types
```

### API Design
Routes are defined declaratively in `shared/routes.ts` with:
- HTTP method and path
- Input validation schemas (Zod)
- Response type definitions
- Enables type-safe API calls from frontend

### Database Schema
Two main tables defined in `shared/schema.ts`:
- **messages**: Guestbook entries (id, content, author)
- **contact_submissions**: Contact form data (id, name, email, phone, message, createdAt)

### Build Process
- Development: Vite dev server with HMR, Express runs via tsx
- Production: Vite builds frontend to dist/public, esbuild bundles server to dist/index.cjs
- Database migrations: `npm run db:push` uses drizzle-kit

## External Dependencies

### Database
- **PostgreSQL**: Primary database via DATABASE_URL environment variable
- **Drizzle ORM**: Type-safe database queries and schema management
- **connect-pg-simple**: PostgreSQL session store (available but may not be in use)

### Third-Party Services
The build script includes bundling support for:
- **Stripe**: Payment processing
- **OpenAI / Google Generative AI**: AI integrations
- **Nodemailer**: Email sending
- **Passport**: Authentication framework

### Key npm Packages
- @tanstack/react-query: Server state management
- react-hook-form + @hookform/resolvers: Form management
- zod: Schema validation
- framer-motion: Animations
- lucide-react: Icon library
- vaul: Drawer component
- embla-carousel-react: Carousel functionality