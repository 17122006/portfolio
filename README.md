<<<<<<< HEAD
# portfolio
=======
# Thrishna — 3D Developer Portfolio

A minimal, premium, dark-themed portfolio built with **React + Vite**, **Material UI**, **React Three Fiber (Three.js)** and **Framer Motion**. One tasteful 3D centerpiece in the hero, everything else calm and fast.

## Quick start

Requires **Node.js 18.18+** (Node 20/22 recommended).

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

## Folder structure

```
thrishna-portfolio/
├── index.html                 # title, meta description, social-preview tags, favicon link
├── vite.config.js             # code-splitting (three.js, MUI, motion in separate chunks)
├── package.json
├── public/
│   ├── favicon.svg
│   └── robots.txt
└── src/
    ├── main.jsx               # entry: font + <App/>
    ├── App.jsx                # layout, lazy-loaded sections, skip link, motion config
    ├── theme/theme.js         # centralized MUI theme + design tokens (colors, type, components)
    ├── data/                  # ← all your content lives here
    │   ├── profile.js         #   name, intro, about, education, resume, social links, contact config
    │   ├── projects.js        #   project cards
    │   ├── certificates.js    #   certificates
    │   ├── skills.js          #   skill categories and items
    │   └── navigation.js      #   nav items (ids must match section ids)
    ├── sections/              # Hero, About, Skills, Projects, Certificates, Contact
    ├── components/            # Navbar, Footer, OrbCanvas, OrbScene (3D), StaticOrb, ProjectCard,
    │                          # SkillGroup, CertificateItem, ContactForm, Reveal, Section, SocialLinks, …
    ├── hooks/                 # useActiveSection, usePageVisible, useInView
    ├── utils/                 # links (safe URLs), scroll, capabilities (WebGL / low-power detection)
    └── assets/                # (empty) put imported images here if you prefer bundling them
```

## Where to edit things

| What | File | Notes |
| --- | --- | --- |
| Name, initials, title, intro, availability badge | `src/data/profile.js` | `name`, `initials`, `title`, `intro`, `availability` |
| Bio, education, career interests | `src/data/profile.js` → `about` | Education is a placeholder — fill in your college and years |
| Resume button | `src/data/profile.js` → `resumeUrl` | Put the PDF in `public/` (e.g. `public/resume.pdf`) and set `'/resume.pdf'`. Empty = button hidden |
| GitHub / LinkedIn / email | `src/data/profile.js` → `social` | Empty = that link is hidden everywhere (hero, contact, footer) |
| Projects | `src/data/projects.js` | Remove `isSample: true` on real ones. Empty `github`/`demo` hides the button |
| Project images | `public/images/` | Reference as `'/images/my-project.webp'` (16:10, ≤1280px wide, WebP/AVIF). No image = generated placeholder |
| Certificates | `src/data/certificates.js` | Remove `isPlaceholder: true` on real ones. Empty `credentialUrl` hides the link |
| Skills | `src/data/skills.js` | Keep only what you genuinely know |
| Colors, fonts, radius | `src/theme/theme.js` | `tokens` at the top control the palette |
| Page title / description / social preview | `index.html` | See "SEO" below |
| 3D orb look | `src/components/OrbScene.jsx` | Colors, sizes, rotation speeds |

> **Nothing is invented.** Sample projects, placeholder certificates and the education entry are clearly labelled and must be replaced. All links are empty until you configure them.

## Contact form

The form validates (accessible error messages) and then behaves honestly depending on your config in `src/data/profile.js`:

1. **`contact.formEndpoint` set** — the message is POSTed as JSON (`{ name, email, message }`). Works with [Formspree](https://formspree.io), [Getform](https://getform.io), [Web3Forms](https://web3forms.com), etc. Success and error states are shown.
2. **Only `social.email` set** — submitting opens the visitor's email app with the message pre-filled (`mailto:`).
3. **Neither set** — the form validates and then says it isn't connected. It never pretends to send.

## 3D, performance and accessibility

- **Lazy loading:** three.js / React Three Fiber live in their own chunk, fetched only when the hero mounts; below-the-fold sections are separate chunks, prefetched when the browser is idle. Each has a skeleton placeholder with a matching `id` so nav links never break.
- **Fallbacks:** a CSS-only orb is shown while the scene loads, when WebGL is unavailable, on very low-powered devices (≤2 cores / ≤2 GB / data-saver), when the user prefers reduced motion, and if the scene errors or the GPU context is lost.
- **Phones/tablets:** simplified scene (fewer polygons, no antialiasing, lower pixel ratio, no pointer tracking).
- **Pausing:** the render loop stops when the tab is hidden or the hero scrolls offscreen.
- **The canvas never blocks anything:** it is `aria-hidden` with `pointer-events: none`.
- **A11y:** skip link, semantic landmarks, labelled sections, visible focus rings, keyboard-friendly drawer, `aria-current` on the active nav item, `prefers-reduced-motion` respected (CSS and Framer Motion).
- **Safe links:** every external link gets `target="_blank" rel="noopener noreferrer"`; only `http(s)`, `mailto:` and site-relative URLs are ever rendered as links.

## SEO and social preview

`index.html` already has a title, meta description, theme color, Open Graph / Twitter text tags and a favicon. After you know your domain, uncomment the placeholder block in `<head>` and add:

- `og:url`, `canonical` → your site URL
- `og:image` / `twitter:image` → an absolute URL to a 1200×630 image (add `public/og-image.png`)

## Build and deploy

```bash
npm run build      # outputs static files to dist/
```

`dist/` is a static site — host it anywhere.

**Vercel** — push to GitHub → *Add New Project* → import → framework "Vite" (build `npm run build`, output `dist`) → Deploy.

**Netlify** — push to GitHub → *Add new site* → import → build command `npm run build`, publish directory `dist` → Deploy. (Or drag-drop the `dist` folder at app.netlify.com/drop.)

**GitHub Pages (project site at `https://<user>.github.io/<repo>/`)**

```bash
VITE_BASE=/<repo>/ npm run build          # Windows PowerShell: $env:VITE_BASE="/<repo>/"; npm run build
```

then publish the contents of `dist/` (for example with the `gh-pages` package or a GitHub Actions Pages workflow). For a `<user>.github.io` user site, no `VITE_BASE` is needed. If you use a base path, reference public files with `import.meta.env.BASE_URL` (e.g. `` `${import.meta.env.BASE_URL}resume.pdf` ``) in `profile.js`.

## Tech

React 18 · Vite 6 · MUI 7 · @react-three/fiber 8 · three · Framer Motion (`LazyMotion`, `domAnimation`) · `@fontsource-variable/space-grotesk` (self-hosted font).
>>>>>>> af14ae6 (commit)
