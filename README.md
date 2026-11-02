# Biswas Parajuli - Portfolio (HTML + CSS + Tailwind + JS)

Static site, no backend. Just open `index.html` (or use any static server).

## Files
- `index.html`, `about.html`, `projects.html`, `contact.html`
- `js/components.js` - common **header + footer** (edit once, all pages update)
- `js/main.js` - dark/light theme, mobile menu, typing + letter animations, contact form
- `js/projects.js` - project cards list (cards only, no project pages)
- `css/styles.css` - the original glass design; `css/tailwind.css` - built Tailwind
- `css/vendor/bootstrap-icons` - icon font (local copy)

## Editing
- Contact form opens the visitor's email app addressed to `CONTACT_EMAIL` (top of `js/main.js`).
- Using new Tailwind classes? Rebuild: `npm install` then `npm run build` (or `npm run dev`).
- No Node? Replace the `css/tailwind.css` link in each page with
  `<script src="https://cdn.tailwindcss.com"></script>` and add before it:
  `<script>tailwind.config={corePlugins:{container:false},theme:{screens:{sm:'576px',md:'768px',lg:'992px',xl:'1200px','2xl':'1400px'}}}</script>`

## Animations (added)
- `css/effects.css` + `js/effects.js` - all animations live here (styles.css is untouched).
- **Your photo:** save it as `assets/profile.jpg` (square, ~600x600). It appears in the home card and About page.
  If the file is missing, the "BP" initials are shown instead.
- **Skill percentages:** change `data-level="85"` on the rings (index.html) and bars (about.html).
- **Preloader** shows once per browser session. To always show it, remove the `sessionStorage` lines in `effects.js`.
- Animations switch off automatically for visitors with "reduce motion" enabled; tilt, glow and magnetic effects are desktop (mouse) only.

## Liquid-Glass redesign (css/glass.css)
- `css/glass.css` is loaded **last** on every page and holds the whole new look: colour tokens (light + dark),
  aurora background + floating bubbles, 3D glass cards, buttons, navbar, forms, project cards and modal.
- **Colours:** change the palette in the two token blocks at the top (`:root` = light, `html.dark` = dark).
- **Water wave:** every `.glass` card sends ripples from its centre while hovered (`.wave` class, added in `effects.js`).
  Speed / size: `waveSpread` + `wavePhase` keyframes in `glass.css`.
- **3D tilt:** `effects.js` -> `setupTilt()`. Strength per card size is in `pointerenter` (`s.max`, `s.lift`, `s.scale`).
- **Projects page:** `.project-grid` shows 3 cards per row (2 on tablet, 1 on phone). Edit cards in `js/projects.js`.
- Old files (`styles.css`, `effects.css`) are still used as the base; `glass.css` overrides them.
