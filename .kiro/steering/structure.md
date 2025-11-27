# Project Structure

## Root Files
```
├── index.html      # Main application entry point
├── app.js          # Application logic and PDF generation
├── style.css       # Styling and layout
├── Readme.md       # Project documentation
└── .kiro/          # Kiro AI assistant configuration
```

## File Responsibilities

### index.html
- Single-page application structure
- Form elements for invoice data entry
- Semantic HTML with accessibility considerations
- CDN script imports (jsPDF)
- Links to local CSS and JS files

### app.js
- Invoice item management (add, remove, calculate)
- Real-time total calculations (subtotal, tax, grand total)
- PDF generation using jsPDF library
- Form reset functionality
- Uses IIFE pattern for encapsulation
- No external module system (ES5 compatible)

### style.css
- Minimal, clean design with CSS custom properties
- Responsive grid layout for form sections
- Compact CSS formatting style
- Mobile-friendly with viewport meta tag support

## Architecture Patterns
- **Single Page Application**: All functionality in one HTML file
- **Progressive Enhancement**: Works without JavaScript for basic form filling
- **Client-Side Only**: No server communication, all processing in browser
- **Immediate Mode UI**: Direct DOM manipulation, no virtual DOM or state management

## Conventions
- Keep all files in root directory (no src/ or dist/ folders)
- Use semantic, descriptive IDs for form elements
- Maintain separation of concerns: HTML structure, CSS presentation, JS behavior
- Inline event handlers avoided in favor of addEventListener
