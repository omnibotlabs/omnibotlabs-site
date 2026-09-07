# Omnibot Labs — Static Website (GitHub Pages)

A modern, production-grade static port of the Omnibot Labs website built from the ground up for **GitHub Pages**.

- **Zero dependencies**: Pure HTML5, CSS3, and Vanilla JavaScript.
- **Zero build steps**: No Node.js, no Python, no bundlers, no Vercel config.
- **Works offline / locally**: Open `index.html` directly in any browser via `file://` or any static file server.
- **Complete brand fidelity**: Preserves all typography, color tokens, Funzo mascot SVGs, animations, interactive ladder grade tabs, and full copy.

---

## File Structure

```
web-gh-pages/
├── index.html          # Homepage with Hero, stats, Funzo mascot, animated canvas, cards, and footer
├── ladder.html         # The Ladder — Interactive bar-chart tab selector across 10 grades (Grades 3–12)
├── capstones.html      # Capstones — Alternating timeline of 10 annual public capstone projects
├── threads.html        # Skill Threads — Dark section with 7-thread SVG spiral chart & legend
├── philosophy.html     # Philosophy — Six rules alternating timeline
├── curriculum.html     # Curriculum — 4 bands (Foundations, Bridge, Engineering, Frontier) across all 10 grades
├── signup.html         # Book a demo class form & parent/family registration preview
├── gallery.html        # Workshop photo grid with interactive lightbox modal
├── css/
│   └── style.css       # Complete unified CSS design system (tokens, responsive grid, dark mode, animations)
├── js/
│   └── main.js         # Vanilla JS (theme toggle, mobile menu, navbar shrink, spotlight, ladder tabs, gallery)
└── README.md           # Deployment & preview guide
```

---

## Running Locally

### Option 1: Direct File
Double-click `index.html` or drag it into any web browser (Chrome, Firefox, Edge, Safari). All assets use relative paths.

### Option 2: Simple Local Server (Optional)
If you prefer testing with an HTTP server:
```bash
# Using Python 3 (if installed)
python -m http.server 8080

# Or using npx
npx serve .
```
Then open `http://localhost:8080` in your browser.

---

## Deploying to GitHub Pages

1. **Create a GitHub repository** (e.g. `omnibotlabs-site` or `<username>.github.io`).
2. **Copy the contents** of this folder to your repository root:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Omnibot Labs GitHub Pages site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
3. **Enable GitHub Pages**:
   - Go to your repository on GitHub: **Settings** → **Pages**.
   - Under **Build and deployment** > **Source**, select **Deploy from a branch**.
   - Select branch: `main`, folder: `/ (root)`.
   - Click **Save**.
4. Within 1–2 minutes, your website will be live at `https://<your-username>.github.io/<your-repo-name>/`.

---

## Key Features

- **Dark / Light Theme**: Instant theme toggle stored in `localStorage` and synchronized across all pages.
- **Interactive Ladder**: 10-grade bar chart tab interface with detailed curriculum cards.
- **Dynamic Hero Background**: High-performance animated multi-color radial gradient canvas.
- **Spotlight Cards**: Mouse-following radial glow on cards.
- **Responsive Layout**: Fluid breakpoints optimized for mobile, tablet, and widescreen desktop.
- **Accessibility & SEO**: Semantic tags, OpenGraph meta tags, ARIA attributes, and `prefers-reduced-motion` support.
