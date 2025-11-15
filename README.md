# Litecoin INR Daily Agent

Automated Next.js service that fetches the live Litecoin (LTC) price in Indian Rupees and emails a daily digest to `sweyjotdhillon@gmail.com`.

## Stack

- Next.js App Router (TypeScript)
- CoinGecko public API for market data
- Resend transactional email delivery
- GitHub Actions workflow scheduled daily at 09:00 IST (03:30 UTC)

## Quickstart

1. Install dependencies
   ```bash
   npm install
   ```
2. Configure environment secrets
   ```bash
   cp .env.example .env.local
   # Replace the placeholder with a valid Resend API key
   ```
3. Run locally
   ```bash
   npm run dev
   ```
4. Trigger the job in development
   ```bash
   curl http://localhost:3000/api/daily-email
   ```

## Deployment

Deploy to Vercel with the `RESEND_API_KEY` secret configured. Manual retries can be initiated with:

```bash
curl https://agentic-f8aae0dd.vercel.app/api/daily-email
```

## Environment

| Variable         | Purpose                                   |
| ---------------- | ----------------------------------------- |
| `RESEND_API_KEY` | Auth token used to send transactional mail |
| `RESEND_API_KEY` (GitHub secret) | Required for the scheduled workflow `Litecoin Daily Email` |

## Scripts

| Command        | Description                |
| -------------- | -------------------------- |
| `npm run dev`  | Start the local dev server |
| `npm run build`| Create a production build  |
| `npm start`    | Serve the production build |
| `npm run lint` | Run ESLint checks          |

## Notes

- Email is dispatched from `Litecoin Agent <onboarding@resend.dev>` to keep configuration simple.
- Price and timestamps are formatted for Indian locale and timezone.
- Delivery status snapshots are cached in-memory for live requests to `/`.
- Automated delivery is orchestrated by `.github/workflows/daily-email.yml`. Configure the `RESEND_API_KEY` repository secret to enable it.
