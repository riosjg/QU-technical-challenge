# Joke App

A React application that displays jokes with filtering, sorting, and pagination capabilities.

## Features

- Fetch and display jokes from the Joke API
- Search/filter jokes by text
- Sort jokes in ascending or descending order
- Pagination support
- Debounced search input
- Responsive Material-UI design
- React Query for data fetching and caching
- TypeScript support
- Unit tests with Vitest and React Testing Library

## Design Decisions

### React Query

- Used for efficient data fetching and caching
- Provides automatic background refetching
- Handles loading and error states
- Implements stale-while-revalidate pattern

### Project Structure

- `/components`: Reusable UI components
- `/hooks`: Custom React hooks
- `/services`: API integration
- `/tests`: Test files mirroring the source structure

### Component Design

- Small, focused components (< 100 lines)
- Separation of concerns
- Reusable hooks for common functionality
- Material-UI for consistent styling

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd joke-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

## Building for Production

```bash
npm run build
```

## Technologies Used

- React 19
- TypeScript
- Material-UI
- React Query
- Vitest
- React Testing Library
- Vite
