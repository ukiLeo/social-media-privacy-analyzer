# Social Media Privacy Analyzer

A web-based social media privacy assessment and cybersecurity awareness platform for college students. The application helps users reflect on their privacy habits, identify potential risks, receive practical recommendations, and learn safer digital behaviors.

## Features

- Privacy self-assessment for Instagram, Facebook, Snapchat, and other platforms
- Four-category scoring engine with transparent results out of 100
- Personalized insights and recommendations
- Downloadable PDF assessment reports
- Awareness Hub covering privacy, passwords, 2FA, phishing, oversharing, and reporting
- 15-question cybersecurity awareness quiz
- Anonymous community survey interface with clearly labeled demo analytics
- Responsive navigation and accessible, student-friendly interface
- Client-side processing with no social media account access

## Technology stack

- React 19
- TypeScript
- Vite 8
- React Router DOM
- Recharts
- Lucide React
- jsPDF
- Vitest
- Tailwind CSS dependencies are present for future utility-based styling; the current UI uses a maintainable CSS design system in `src/index.css`.

## Getting started

### Requirements

- Node.js 20.19 or newer
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Run the production build

```bash
npm run build
```

### Run tests

```bash
npm test
```

## Deployment on Vercel

Import the repository into Vercel with these settings:

- Framework preset: Vite
- Root directory: `.`
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

The included `vercel.json` makes the build and output settings explicit. No server-side environment variables are required for the current client-only version.

## Privacy and security disclaimer

This project is an educational self-assessment tool. It does not access, scan, scrape, hack, or technically verify any social media account. It never requests or stores passwords, OTPs, login codes, recovery codes, cookies, private messages, usernames, or account links. Individual assessment answers are processed in the browser and are not sent to a backend.

Community Insights currently displays clearly labeled demo data. The survey interface collects only general awareness information and does not collect personally identifying information.
