# CheckSafe - Everyday Digital Safety & AI Checkpoint

## Overview

CheckSafe is a modern web application that provides free, browser-based cybersecurity and AI analysis tools for everyday users. The platform offers four core security tools: Email/Domain Breach Lookup (using HaveIBeenPwned API), Phishing Email Analyzer, AI Text Detector, and Bias Spotlight. The application emphasizes trust, transparency, and user-friendly design with a focus on explainability - helping users understand not just the results, but why they received them.

The project is built with a React frontend and Express backend, featuring a clean, accessible interface that makes complex security concepts approachable for non-technical users.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript using Vite as the build tool

**UI Components**: Radix UI primitives with shadcn/ui component library styled using Tailwind CSS. The design system follows a "New York" style variant with custom color schemes for light and dark modes, emphasizing trust and security through confident blues and clear risk indicators (green for safe, amber for warning, red for danger).

**State Management**: TanStack Query (React Query) for server state management with custom query client configuration. No complex global state management - components maintain local state with useState hooks.

**Routing**: Wouter for lightweight client-side routing

**Styling Approach**: Tailwind CSS with extensive customization through CSS variables for theming. The design system includes custom border radius values, elevation states (hover-elevate, active-elevate), and a comprehensive color palette that supports both light and dark modes.

**Theme System**: Custom ThemeProvider component manages light/dark mode preferences with localStorage persistence

### Backend Architecture

**Framework**: Express.js with TypeScript running on Node.js

**API Design**: RESTful JSON API with dedicated endpoints for each tool:
- `/api/check-breach` - Email breach validation
- `/api/analyze-phishing` - Phishing email analysis
- `/api/detect-ai` - AI text detection
- `/api/analyze-bias` - Bias analysis in text

**Validation**: Zod schemas for request/response validation defined in shared schema file, ensuring type safety across frontend and backend

**Error Handling**: Centralized error handling middleware that normalizes error responses and status codes

**Development Setup**: Vite middleware integration for hot module replacement in development, with separate production build process using esbuild for server bundling

### External Dependencies

**HaveIBeenPwned API**: Third-party breach database integration for email/domain breach lookups. Supports optional API key authentication via environment variable `HIBP_API_KEY`. Returns breach data including name, date, severity, and description.

**OpenAI API**: Powers three core features (phishing analysis, AI detection, bias analysis) using GPT-5 model. Requires `OPENAI_API_KEY` environment variable. All AI responses use structured JSON output format for consistent parsing.

**Database**: 
- Drizzle ORM configured for PostgreSQL (via `@neondatabase/serverless`)
- Schema defined in `shared/schema.ts`
- Database connection via `DATABASE_URL` environment variable
- Uses Neon serverless PostgreSQL driver for production deployments
- Currently includes user schema but main features are stateless (no data persistence for security tools)

**Google Fonts**: Inter for primary UI text, JetBrains Mono for monospace/technical displays

**Development Tools**:
- Replit-specific plugins for runtime error overlay, cartographer, and dev banner
- TypeScript with strict mode enabled
- Path aliases for cleaner imports (@/, @shared/, @assets/)

**Build Process**: 
- Client: Vite builds React app to `dist/public`
- Server: esbuild bundles Express server to `dist/index.js`
- Separate development and production configurations