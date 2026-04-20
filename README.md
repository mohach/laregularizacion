# LaRegularizacion.com

Independent multilingual guide for Spain's Extraordinary Regularization 2026.

**Unofficial site · Not affiliated with the Spanish Government.**

---

## Stack

- **Astro 4** — static site generator
- **Tailwind CSS** — styling
- **DeepSeek API** — daily content agent
- **GitHub Actions** — automated daily runs
- **Cloudflare Pages** — hosting + CDN

## Languages

| Code | Language | Direction | Font |
|------|----------|-----------|------|
| `es` | Español  | LTR | Source Serif 4 + Sora |
| `en` | English  | LTR | Source Serif 4 + Sora |
| `ar` | العربية  | **RTL** | **Noto Kufi Arabic** |
| `ur` | اردو     | **RTL** | **Noto Nastaliq Urdu** |

---

## Quick Start (local)

```bash
npm install
npm run dev          # dev server at localhost:4321
npm run build        # production build → dist/
npm run agent        # run content agent manually (needs DEEPSEEK_API_KEY)
```

---

## Deploy to Cloudflare Pages

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — LaRegularizacion.com"
git remote add origin git@github.com:YOUR_USERNAME/laregularizacion.git
git push -u origin main
```

### 2. Connect to Cloudflare Pages

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Pages**
2. Click **Create a project** → **Connect to Git**
3. Select your repository
4. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/`
5. Click **Save and Deploy**

### 3. Add your domain

1. In Cloudflare Pages project → **Custom domains**
2. Add `laregularizacion.com`
3. Cloudflare will automatically configure DNS (if domain is on Cloudflare)

---

## Daily Content Agent — GitHub Secrets Required

Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**

Add these secrets:

| Secret | Value |
|--------|-------|
| `DEEPSEEK_API_KEY` | Your DeepSeek API key from [platform.deepseek.com](https://platform.deepseek.com) |
| `CF_DEPLOY_HOOK` | Cloudflare Pages deploy hook URL (optional — auto-deploy via git push is enough) |

### How to get a Cloudflare deploy hook (optional)

1. Cloudflare Pages project → **Settings** → **Builds & deployments**
2. Scroll to **Deploy hooks** → Create a hook
3. Copy the URL → add as `CF_DEPLOY_HOOK` secret

### Agent schedule

The agent runs daily at **07:00 Madrid time** (06:00 UTC summer). You can also trigger it manually:

```
GitHub repo → Actions → "Daily Content Agent" → Run workflow
```

---

## What the Agent Does (scripts/agent.mjs)

Every day, the agent:

1. **Scrapes** 8 official + trusted news sources:
   - `inclusion.gob.es/regularizacion` (official)
   - `lamoncloa.gob.es` (official)
   - `boe.es` (official)
   - El País, El Mundo, Europa Press, Euronews, Infobae (trusted news)

2. **Sends** extracted text to DeepSeek (`deepseek-chat` model)

3. **Analyzes** for:
   - Newsworthy topics for migrants today
   - Trending keyword opportunities
   - Official updates or changes
   - SEO-optimized titles with primary/secondary keywords

4. **Generates** full blog articles in all 4 languages (ES/EN/AR/UR)

5. **Writes** MDX files to `src/content/blog/`

6. **Updates** `src/data/trending.json` (shown live on the homepage)

7. **Commits & pushes** → triggers Cloudflare Pages rebuild

### Official sources used

The agent ONLY uses content from:
- `inclusion.gob.es` — Spanish Ministry of Inclusion (official)
- `boe.es` — Official State Gazette
- `lamoncloa.gob.es` — Spanish Government press releases
- **Tier 1 newspapers**: El País, El Mundo, Europa Press, Euronews, Infobae

It never uses forums, social media, or unverified sources.

---

## Keyword Strategy

The agent targets these SEO keywords automatically:

**Primary (ES):**
- regularización extraordinaria 2026
- regularización migrantes españa
- formulario EX-32 / EX-31
- requisitos regularización 2026
- cita previa regularización

**Primary (EN):**
- spain regularization 2026
- spain immigration amnesty 2026
- how to regularize status spain

**Primary (AR):**
- تسوية أوضاع إسبانيا 2026
- تسوية المهاجرين إسبانيا

The agent detects **trending questions** from news content and optimizes article titles to match search intent.

---

## Project Structure

```
laregularizacion/
├── src/
│   ├── pages/
│   │   ├── index.astro          → / (ES)
│   │   ├── en/index.astro       → /en/
│   │   ├── ar/index.astro       → /ar/
│   │   ├── ur/index.astro       → /ur/
│   │   ├── blog/
│   │   │   ├── index.astro      → /blog/
│   │   │   └── [slug].astro     → /blog/:slug
│   │   └── sitemap.xml.ts       → /sitemap.xml
│   ├── layouts/
│   │   └── Base.astro           → SEO + nav + footer
│   ├── components/
│   │   └── PageContent.astro    → Full page (all sections, RTL-aware)
│   ├── data/
│   │   ├── translations.ts      → All text in 4 languages
│   │   └── trending.json        → Agent output (homepage blog feed)
│   ├── content/
│   │   └── blog/                → MDX blog posts (auto-generated)
│   └── styles/
│       └── global.css           → Fonts, RTL, animations
├── scripts/
│   └── agent.mjs                → DeepSeek content agent
├── .github/
│   └── workflows/
│       └── agent.yml            → Daily GitHub Action
├── public/
│   ├── robots.txt
│   └── _headers                 → Cloudflare security headers
├── astro.config.mjs
└── tailwind.config.mjs
```

---

## SEO Features

- ✅ `<title>` and `<meta description>` per language
- ✅ `<link rel="canonical">` per page
- ✅ `hreflang` alternate links (ES/EN/AR/UR + x-default)
- ✅ Open Graph tags (og:title, og:description, og:image)
- ✅ Twitter Card tags
- ✅ JSON-LD structured data
- ✅ `/sitemap.xml` auto-generated daily
- ✅ `/robots.txt` with sitemap reference
- ✅ Keyword-optimized blog titles (agent-driven)
- ✅ RTL `dir="rtl"` + `lang="ar"` / `lang="ur"` on `<html>`
- ✅ Security headers via `_headers`

---

## Adding a blog page for /en/blog, /ar/blog, /ur/blog

To add language-specific blog listing pages, duplicate `src/pages/blog/index.astro` to:
- `src/pages/en/blog/index.astro` (change `t('es')` to `t('en')`)
- `src/pages/ar/blog/index.astro` (change to `t('ar')`)  
- `src/pages/ur/blog/index.astro` (change to `t('ur')`)

And duplicate `src/pages/blog/[slug].astro` similarly, rendering the appropriate `body_XX` field.

---

## Legal Disclaimer

This site is **not official**. It is an independent informational guide based on public sources (BOE, inclusion.gob.es). Always verify information at the official source before making decisions.

Official source: [inclusion.gob.es/regularizacion](https://www.inclusion.gob.es/regularizacion)
