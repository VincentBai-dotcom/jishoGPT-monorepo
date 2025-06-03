# JishoGPT

A modern Japanese dictionary application powered by GPT, built with [Next.js](https://nextjs.org/) and bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

- AI-powered Japanese word definitions and explanations
- Interactive search functionality
- User authentication with NextAuth
- Stripe integration for premium features
- Responsive design with Tailwind CSS and DaisyUI
- Real-time word suggestions
- History tracking for searched words
- Customizable user preferences

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.0.0 or later
- npm, yarn, pnpm, or bun
- MongoDB (local or Atlas)
- OpenAI API key
- Stripe account (for payment features)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# OpenAI
OPENAI_API_KEY=your_openai_api_key

# MongoDB
MONGODB_URI=your_mongodb_uri

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

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
- [`src/styles/`](src/styles/) - Global styles and Tailwind configuration
- [`src/types/`](src/types/) - TypeScript type definitions
- [`src/hooks/`](src/hooks/) - Custom React hooks
- [`src/utils/`](src/utils/) - Helper functions and utilities

## Technology Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with DaisyUI components
- **Authentication**: NextAuth.js
- **AI Integration**: OpenAI API
- **Database**: MongoDB with Mongoose
- **Payments**: Stripe
- **Font Optimization**: [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) with Inter
- **State Management**: React Context + Zustand
- **Form Handling**: React Hook Form + Zod
- **Testing**: Jest + React Testing Library

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and follow our code style guidelines.

## Testing

Run the test suite:

```bash
npm test
# or
yarn test
# or
pnpm test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please:
- Open an issue in the GitHub repository
- Join our Discord community
- Contact us at support@jishogpt.com

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
