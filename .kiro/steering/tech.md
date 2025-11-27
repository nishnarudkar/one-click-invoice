# Technology Stack

## Core Technologies
- **HTML5**: Semantic markup with form elements
- **Vanilla JavaScript**: No frameworks, IIFE pattern for encapsulation
- **CSS3**: Custom properties for theming, grid layout for responsive design

## External Dependencies
- **jsPDF** (v2.5.1): PDF generation library loaded via CDN
  - Accessed via `window.jspdf.jsPDF`
  - Used for client-side PDF export

## Build System
None required. This is a static web application with no build step.

## Common Commands
```bash
# Run locally (any static server)
# Option 1: Python
python -m http.server 8000

# Option 2: Node.js (if http-server is installed)
npx http-server

# Option 3: Just open the file
# Open index.html directly in a browser
```

## Deployment
- Static hosting compatible (GitHub Pages, Netlify, Vercel, etc.)
- No server-side processing required
- All files can be served as-is

## Code Style Conventions
- Use IIFE pattern to avoid global namespace pollution
- Prefer `const` for immutable references
- Use template literals for HTML string generation
- Keep functions small and focused on single responsibilities
- Use semantic HTML elements
- CSS uses compact formatting with custom properties for theming
