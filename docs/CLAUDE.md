# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TapPrint is a printing management system consisting of two main applications:
- **TapPrint-admin**: Next.js frontend admin interface (port 3050)
- **TapPrint-backend**: Express.js backend API with printing capabilities (port 3001)

## Architecture

### Frontend (TapPrint-admin)
- **Framework**: Next.js 14 with App Router
- **UI Library**: Mantine v7 with TypeScript
- **Styling**: PostCSS with Mantine preset
- **State Management**: Zustand
- **Data Fetching**: SWR
- **Testing**: Jest + React Testing Library
- **Storybook**: Component development environment

Key directories:
- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable UI components organized by feature
- `utils/` - Utility functions and helpers
- `types/` - TypeScript type definitions

### Backend (TapPrint-backend)
- **Framework**: Express.js with Node.js
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT with bcrypt
- **File Upload**: express-fileupload and multer
- **Printing**: node-cups and unix-print integration
- **WebSocket**: Real-time communication for print status
- **API Documentation**: Swagger/OpenAPI

Key directories:
- `src/routes/` - API route handlers for different domains
- `src/middleware/` - Authentication, error handling, response formatting
- `src/utils/` - Backend utilities and helpers
- `src/websocket/` - WebSocket implementation
- `prisma/` - Database schema and migrations

## Common Development Commands

### Frontend (TapPrint-admin)
```bash
cd TapPrint-admin

# Development
npm install --legacy-peer-deps  # Install dependencies (required due to i18n conflicts)
npm run dev                 # Start dev server on port 3050
npm run build              # Build for production
npm run start              # Start production server

# Code Quality
npm run test               # Run all tests (prettier, lint, typecheck, jest)
npm run typecheck          # TypeScript type checking
npm run lint               # ESLint + Stylelint
npm run jest               # Run Jest tests
npm run jest:watch         # Jest in watch mode

# Development Tools
npm run storybook          # Start Storybook on port 6006
npm run prettier:write     # Format code with Prettier
```

### Backend (TapPrint-backend)
```bash
cd TapPrint-backend

# Development
npm run dev                # Start dev server on port 3001

# Database
npx prisma migrate deploy  # Apply migrations
npx prisma generate        # Generate Prisma client
npm run seed               # Seed database

# Using Task (alternative)
task run                   # Run the application
task initialize_db         # Initialize database
task create_next_migration # Create database migration
```

## Database Schema

The system uses Prisma with SQLite for data persistence. Key entities include:
- **Layout**: Print layout templates with content and dimensions
- **PrintSet**: Collection of print jobs and settings
- **Category**: Organizational structure for layouts and print sets
- **Printer**: Printer configuration and status
- **User**: Authentication and user management

Database file location: `TapPrint-backend/db/tapprint.db`

## Key Features

### Print Management
- CUPS integration for printer discovery and management
- PDF generation using @pdfme libraries
- Individual PDF export for print sets via kebab menu
- Real-time print status updates via WebSocket
- Support for various printer drivers and configurations

### Layout System
- Visual layout designer with drag-and-drop components powered by PDFme v5.4.1
- Template-based printing with dynamic data injection
- Category-based organization of layouts and print sets
- Advanced zoom functionality up to 400% for precise small label editing
- Intelligent handle scaling system that inversely scales UI elements based on zoom level
- Comprehensive library patching system for react-moveable and PDFme handle customization

### Authentication & Security
- JWT-based authentication with token refresh
- Network-based conditional authentication
- Password reset functionality with email integration

## Development Notes

### Frontend Patterns
- Components follow Mantine design patterns
- Use TypeScript strict mode
- State management with Zustand stores
- API calls handled through SWR with proper error handling

### Backend Patterns
- RESTful API design with consistent response formatting
- Middleware-based authentication and error handling
- Prisma for database operations with transaction support
- WebSocket for real-time features

### Testing
- Jest configuration for both unit and integration tests
- React Testing Library for component testing
- Test utilities in `test-utils/` directory

## Environment Setup

### Prerequisites
- Node.js (version specified in .nvmrc)
- CUPS printing system (for printer integration)
- SQLite database

### Configuration
- Backend uses dotenv for environment variables
- Database connection configured in `prisma/schema.prisma`
- CORS configured for cross-origin requests between frontend and backend
- Frontend uses `.npmrc` with `legacy-peer-deps=true` for dependency resolution

## Important Setup Notes

### Frontend Dependencies
Due to version conflicts between i18n libraries, the frontend requires installation with legacy peer deps:
- Use `npm install --legacy-peer-deps` or `npm ci --legacy-peer-deps`
- The `.npmrc` file is configured to handle this automatically
- This resolves conflicts between `react-i18next`, `i18next`, and `next-i18next` versions

## PDFme Designer Integration

### Zoom and Handle Scaling System
The project implements a sophisticated zoom and handle scaling system for the PDFme Designer:

#### Key Components:
- **Maximum Zoom**: Configured to 400% (increased from default 200%) for precise small label editing
- **Inverse Handle Scaling**: Handles become smaller as zoom increases for optimal usability
- **Real-time Zoom Detection**: Uses MutationObserver to monitor DOM changes and detect zoom level
- **CSS Variable System**: `--pdfme-handle-scale` dynamically controls handle sizes across all UI elements

#### Technical Implementation:
- **Location**: `components/pdfme/Designer.tsx` (lines 787-822)
- **Zoom Detection**: Scans DOM elements with `transform: scale()` properties
- **Handle Scale Calculation**: `handleScale = Math.max(0.25, 1 / currentZoom)`
- **CSS Integration**: `app/globals.css` contains dynamic selectors for moveable elements

#### Library Patching System:
- **Patch Script**: `scripts/patch-moveable-handles.js`
- **Target Libraries**:
  - `react-moveable/dist/moveable.esm.js`
  - `@pdfme/ui/dist/index.es.js`
  - `@pdfme/ui/dist/index.umd.js`
- **Automation**: Runs via `npm run patch:moveable` and `postinstall` hook
- **Patch Count**: 30+ modifications converting static pixel values to CSS calc() expressions

#### Build Integration:
- **package.json**: Added `patch:moveable` script and `postinstall` hook
- **Build Process**: `npm run build` now runs patches before Next.js build
- **Backup System**: Original files backed up with `.backup` extension

#### System Status:
- **Fully Operational**: All zoom and handle scaling features are working correctly
- **Maximum Zoom**: 400% zoom capability for precise small label editing
- **Handle Responsiveness**: Automatic inverse scaling maintains usability at all zoom levels
- **Library Compatibility**: Both react-moveable and PDFme libraries properly patched and integrated