# Integration App Demo

A SvelteKit application demonstrating integration with integration.app services.

## Prerequisites

- Node.js >= 16
- npm or pnpm
- integration.app workspace credentials

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd fluincy-app
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Configure environment variables:
```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your integration.app credentials
VITE_WORKSPACE_KEY=your_workspace_key
VITE_WORKSPACE_SECRET=your_workspace_secret
```

## Development

Start the development server:
```bash
npm run dev
# or
pnpm dev
```

The app will be available at `http://localhost:5173`

## Building

Create a production build:
```bash
npm run build
# or
pnpm build
```

Preview the production build:
```bash
npm run preview
# or
pnpm preview
```

## Features

- Integration.app SDK integration
- JWT token generation
- Dynamic integration loading
- Environment variable configuration

## Environment Variables

- `VITE_WORKSPACE_KEY`: Your integration.app workspace key
- `VITE_WORKSPACE_SECRET`: Your integration.app workspace secret

## Notes

Make sure to never commit your `.env` file containing real credentials. The `.gitignore` file is configured to exclude it.
