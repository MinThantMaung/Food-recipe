# Food Recipe — Frontend

A responsive recipe discovery application built with React and TypeScript. Browse cuisines, find meals, follow cooking instructions, and save recipes to your personal collection.

This repository contains the frontend. The Express API and database are maintained in a separate backend repository.

<!-- Replace these placeholders with your actual links before publishing. -->
- **Live website:** https://everyday-flavours.vercel.app/
- **Backend repository:** https://github.com/MinThantMaung/Food-Recipe-api

## Features

- Recipe browsing with search, filters, sorting, and pagination.
- Cuisine and meal category discovery.
- Recipe detail pages with cooking times, ingredients, and ordered instructions.
- Serving controls that adjust ingredient quantities.
- Recipe ratings and reviews display.
- Saved recipes for authenticated users.
- Email registration, OTP verification, login, and password recovery.
- Google sign-in.
- Profile and account settings.
- Responsive layouts, form validation, loading states, and error feedback.
- About, Contact, and Privacy pages.

## Tech Stack

| Purpose | Technology |
| --- | --- |
| Application | React, TypeScript, Vite |
| Styling | Tailwind CSS |
| Components and icons | shadcn/ui, Lucide React |
| Routing | React Router |
| Server state | TanStack Query |
| Shared client state | Zustand |
| Forms | React Hook Form, Zod |
| Testing | Vitest, React Testing Library, user-event |
| Image delivery | Amazon CloudFront,S3 |
| Hosting | Vercel |

## Getting Started

### Prerequisites

- Node.js and npm compatible with this repository's package configuration.
- Access to a running Food Recipe backend.
- A Google OAuth client ID to enable Google sign-in.

### Installation

Clone this repository, open its directory, and install dependencies:

```bash
npm install
```

### Environment Configuration

Create a local `.env` file, using `.env.example` if one is available:

```dotenv
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
VITE_CDN_URL=https://your-cloudfront-domain.cloudfront.net
```

Configure the API base URL using the exact variable name read by the API client. The local backend base URL used during development is:

```text
http://localhost:4000/api/v1
```

All `VITE_` variables are public browser configuration. Keep email API keys, database credentials, and token-signing secrets in the backend.

### Run Locally

Check `package.json` for the available scripts:

```bash
npm run
```

If the repository defines the `dev` script:

```bash
npm run dev
```

Open the URL printed by Vite. Run the backend in another terminal and ensure its CORS configuration allows this frontend origin.

For Google sign-in, configure the frontend origin in the Google OAuth client settings.

### Production Build

Using the project's build script:

```bash
npm run build
```

If a `preview` script is configured, preview the build locally:

```bash
npm run preview
```

The preview server may use a different port from the development server. Its origin must also be allowed by the backend when testing API requests.

## Testing

Tests use Vitest, React Testing Library, and user-event. Existing test work includes password validation; coverage is being expanded.

```bash
# Run tests once
npx vitest run

# Watch for changes
npx vitest
```

## How It Works

React Router manages navigation. TanStack Query manages API data, caching, and mutations, while Zustand holds shared client state. React Hook Form and Zod handle forms and validation.

The frontend calls the separate Express API under `/api/v1`. The backend manages authentication cookies and database operations. Recipe images are loaded from CloudFront.

## Deployment

The frontend is hosted on Vercel.

- Configure the production API URL, Google client ID, and CDN URL.
- Ensure the backend accepts requests from the deployed frontend origin.
- Register the deployed frontend origin for Google sign-in.
- Configure SPA route fallback so direct visits to nested routes work.
- Rebuild and redeploy after changing frontend environment variables.

## Roadmap

- [ ] Expand tests for authentication, saved recipes, and profile settings.
- [ ] Review keyboard navigation and accessibility.
- [ ] Refine mobile layouts and error states.
- [ ] Add an admin interface for managing recipes.

## Author

**Min Thant Maung**

[LinkedIn](https://www.linkedin.com/in/min-thant-maung-2620411b3/)

## License

Refer to the repository's `LICENSE` file, if present, for usage terms.
