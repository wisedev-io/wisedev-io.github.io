# Kamoliddin Rasulov — Portfolio

Bilingual (EN/UZ) portfolio. Angular 20 frontend + Flask contact API.

**Live:** https://wisedev-io.github.io

## Structure

```
├── src/                  Angular app
│   └── app/
│       ├── core/         i18n service, project data, config.ts (EDIT API URL HERE)
│       └── pages/        home, project (case studies), about, contact
├── public/               profile photo, CV pdf, favicon
├── backend/              Flask contact API (deploy separately — see below)
└── .github/workflows/    auto build & deploy to GitHub Pages on every push
```

## Run locally

```bash
npm install
npx ng serve          # frontend at http://localhost:4200

cd backend
pip install -r requirements.txt
python app.py         # API at http://localhost:5000
```

For local testing, set `CONTACT_API_URL` in `src/app/core/config.ts`
to `http://localhost:5000/api/contact`.

## Deploy frontend (free, GitHub Pages)

1. Create a **public** repo named exactly `wisedev-io.github.io`.
2. Push this project to `main`.
3. Repo → Settings → Pages → Source: **GitHub Actions**.
4. Done — every push rebuilds and deploys automatically.
   Site: https://wisedev-io.github.io

## Deploy backend (free, Render)

1. Push the `backend/` folder to a repo (or keep it in this one).
2. On render.com → New → Web Service → connect the repo,
   root directory `backend`. Render reads `render.yaml` automatically.
3. Set env vars for Telegram notifications (optional but recommended):
   - `TELEGRAM_BOT_TOKEN` — create a bot with @BotFather
   - `TELEGRAM_CHAT_ID` — message @userinfobot to get your id
4. Copy the service URL and paste it into
   `src/app/core/config.ts` → `CONTACT_API_URL`, then push.

> Why Render and not the Ubuntu server? GitHub Pages is HTTPS, and browsers
> block HTTPS pages from calling plain-HTTP APIs (mixed content). Render's
> free tier includes HTTPS. If you later put a TLS certificate on your own
> server (nginx + certbot with a domain), you can point the config there.

If the API is unreachable, the contact form automatically falls back
to a mailto link — the site never looks broken.

## Editing content

- Projects / case studies: `src/app/core/projects.ts` (both languages side by side)
- UI text: `src/app/core/i18n.ts`
- Contact details: `src/app/core/config.ts`
- CV file: replace `public/Kamoliddin_Rasulov_CV.pdf`
