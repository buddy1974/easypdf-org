# EasyPDFKit.org

Free online PDF and image productivity tools. No signup. No watermarks. Privacy-first.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (route-based code splitting via React.lazy)
- **Tailwind CSS v3**
- **React Router v6**
- **gray-matter + marked** (Markdown blog)
- **JSZip** (client-side ZIP for Bulk Image Renamer)
- **Lucide React** (icons)

## Project Structure

\
## Local Development

\
## Production Build

\
Output goes to /dist. Upload to any static host.

## Environment Variables

\
Image tools are fully client-side. PDF tools call VITE_API_BASE_URL.

## Apache / cPanel Deployment

Upload /dist to public_html. Add .htaccess for SPA routing:

\
## Nginx Deployment

\
## Cloudflare Pages

- Build command: npm run build
- Output directory: dist
- Set VITE_API_BASE_URL in environment variables

## Worker API Deployment

\
## Blog System

Add .md files to /content/blog/ with frontmatter:

\
Posts are auto-discovered at build time via Vite glob imports.

## SEO

- Unique title + description on every page (MetaTags component)
- Open Graph tags on all pages
- Canonical URLs on all pages
- BreadcrumbSchema JSON-LD on tool and blog pages
- FAQSchema JSON-LD on all tool pages
- Article JSON-LD on blog posts
- sitemap.xml covers all 44 routes
- robots.txt allows full crawling

## Security

- Image processing runs in-browser via Canvas API — no server uploads
- PDF files sent over HTTPS to VITE_API_BASE_URL only
- No API keys or secrets in the frontend bundle
- Content Security Policy header in index.html
- Worker has IP-based rate limiting and 50 MB file size limit
