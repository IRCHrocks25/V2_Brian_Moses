This is a [Next.js](https://nextjs.org/) project bootstrapped with the following specifications:

- **Framework**: Next.js 14.2.35 (React-based)
- **Language**: TypeScript
- **Router**: App Router (Next.js 13+)
- **Styling**: Tailwind CSS
- **React version**: 18.3.1

## Project Structure

```
├── app/              # App Router (Next.js 13+)
├── components/        # React components
├── public/           # Static assets
└── ...config files
```

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Railway Deployment

This project is configured for deployment on Railway.

### Configuration

- **Allowed Host**: `v2brianmoses-production.up.railway.app`
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

The Railway hostname is configured in `next.config.js` for:
- Image optimization domains
- Remote image patterns

### Deployment Checklist

- [x] Next.js is in `dependencies` (not `devDependencies`)
- [x] Build script configured: `npm run build`
- [x] Start script configured: `npm start`
- [x] Railway hostname configured in `next.config.js`
- [x] `railway.json` configuration file created

### Environment Variables

If needed, set the following in Railway:
- `NODE_ENV=production` (automatically set by Railway)
- Any custom environment variables your app requires

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Railway Documentation](https://docs.railway.app/) - learn about Railway deployment.

# V2_Brian_Moses
