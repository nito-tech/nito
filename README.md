# Nito

## Getting Started

Ref: [Environment variables | Vercel](https://vercel.com/docs/environment-variables)

```sh
# 1. Download Vercel CLI
pnpm i -g vercel

# 2. Link your local project directory to your Vercel project in the cloud
vercel link

# 3.Pull the development environment variables
vercel env pull apps/web/.env --environment development

# 4. Run server
pnpm dev
```
