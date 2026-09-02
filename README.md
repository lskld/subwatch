# Subwatch - subscription tracker

Subwatch is a subscription tracker. You register an account, add the subscriptions you pay for, organise them into your own categories, and the dashboard shows what they add up to per month. Every price change is kept as price history, so each subscription has a chart of what it has cost you over time.

The repo contains two projects:

| Folder | What it is |
| --- | --- |
| [`subwatch-api`](subwatch-api) | ASP.NET Core 10 Web API — EF Core + SQL Server, ASP.NET Identity, JWT auth |
| [`subwatch-frontend`](subwatch-frontend) | React 19 + TypeScript SPA

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 24+](https://nodejs.org)
- SQL Server 

## 1. Run the API

The connection string and the JWT signing key are not in source control — the project uses [user secrets](https://learn.microsoft.com/aspnet/core/security/app-secrets), so set them locally:

```bash
dotnet user-secrets set --project subwatch-api "ConnectionStrings:DefaultConnection" "<your connection string here>"
```

```bash
dotnet user-secrets set --project subwatch-api "Jwt:SigningKey" "<any random string of at least 32 characters>"
```

Create the database from the migrations:

```bash
dotnet ef database update --project subwatch-api
```

Then start it:

```bash
dotnet run --project subwatch-api
```

The API listens on `http://localhost:5114`. Interactive API docs are at [http://localhost:5114/scalar/v1](http://localhost:5114/scalar/v1).

## 2. Run the frontend

In a second terminal:

```bash
cd subwatch-frontend && npm install && npm run dev
```

Open [http://localhost:5173](http://localhost:5173), register an account, and you're in.

## API overview

All routes are under `/api`. Everything except `login` and `register` requires a `Bearer` token, which the frontend stores in `localStorage` and attaches automatically.

- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- `GET|POST|PUT|DELETE /api/subscriptions`
- `GET|POST|PUT|DELETE /api/subscriptioncategories`
- `GET|POST|PUT|DELETE /api/pricehistories`, plus `GET /api/pricehistories/subscription/{subscriptionId}`

## Deployment

Both projects deploy to Azure Web Apps on every push to `main` via GitHub Actions — see [`.github/workflows`](.github/workflows). In production the API reads its connection string, signing key and `Cors:AllowedOrigins` from Azure app settings, and the frontend uses the API URL in [`.env.production`](subwatch-frontend/.env.production).

Link to deployed frontend: https://subwatch-dashboard-bbg9f0fzdxbkg2ez.italynorth-01.azurewebsites.net/

Link to deployed API: https://subwatch-eug4bhezgdddakd7.italynorth-01.azurewebsites.net/scalar
