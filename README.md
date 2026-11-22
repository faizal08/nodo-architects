# NODO Architects — Website

The Art of Connection. Studio website for NODO Architects, founded by Ar. Shana Rahmath.

**Stack:** React 19 · Vite · Tailwind CSS v4 · React Router · Framer Motion · Lenis smooth scroll

## Pages
- `/` Home · `/studio` · `/founder` · `/projects` · `/projects/:slug` (5 case studies) · `/services` · `/approach` · `/contact`

## Edit content
- Studio details (email, phone, location): `src/data/site.js`
- Projects (text, specs, images): `src/data/projects.js` — add an object to add a project page
- Images: `public/images/`

## Run locally
```bash
npm install
npm run dev
```

## Deploy (Vercel)
Import this repo at vercel.com → Add New → Project. Vercel detects Vite automatically; `vercel.json` handles page routes.
