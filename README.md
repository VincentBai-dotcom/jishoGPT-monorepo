# JishoGPT

A modern Japanese dictionary application powered by GPT, built with [Next.js](https://nextjs.org/) and bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

- AI-powered Japanese word definitions and explanations
- Interactive search functionality
- User authentication with NextAuth
- Stripe integration for premium features
- Responsive design with Tailwind CSS and DaisyUI

## Getting Started

First, install the dependencies and run the development server:

```bash
npm install
npm run dev
# or
yarn install && yarn dev
# or
pnpm install && pnpm dev
# or
bun install && bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

You can start editing the main page by modifying [`src/app/page.tsx`](src/app/page.tsx). The page auto-updates as you edit the file.

## Project Structure

- [`src/app/`](src/app/) - Next.js app router pages and API routes
- [`src/components/`](src/components/) - Reusable React components
- [`src/lib/`](src/lib/) - Utility functions and configurations
- [`models/`](models/) - Database models for User, WordEntry, and Definition
- [`public/`](public/) - Static assets

## Technology Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with DaisyUI components
- **Authentication**: NextAuth.js
- **AI Integration**: OpenAI API
- **Database**: MongoDB with Mongoose
- **Payments**: Stripe
- **Font Optimization**: [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) with Inter

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [OpenAI API Documentation](https://platform.openai.com/docs) - for AI integration
- [NextAuth.js Documentation](https://next-auth.js.org/) - for authentication

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
