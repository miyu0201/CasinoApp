# ComeOn Group Test App

A React application for displaying and launching games using the ComeOn game platform.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- json-server (for mock API)

## Project Structure

```
comeongroup-test-app/
├── src/              # Source files
├── public/           # Static files
├── mock/            # Mock data and API
└── node_modules/    # Dependencies
```

## Setup Instructions

1. First, start the mock server:
   ```bash
   # Navigate to the comeon-frontend-test folder
   cd comeon-frontend-test
   
   # Start the mock server
   json-server --watch mock/mock-data.json --port 3001 --middlewares mock/mock-api.js
   ```

2. In a new terminal, set up and start the React application:
   ```bash
   # Navigate to the comeongroup-test-app folder
   cd comeongroup-test-app
   
   # Install dependencies
   npm install
   
   # Start the development server
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` (or the URL shown in your terminal)

## Features

- Game listing page
- Individual game launch page
- Integration with ComeOn game platform
- Mock API for development

## Technologies Used

- React
- Vite
- React Router
- Reactstrap
- json-server (for mock API)

## Development

The application uses Vite as the build tool and development server. The mock server runs on port 3001, while the React application runs on port 5173 by default.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
