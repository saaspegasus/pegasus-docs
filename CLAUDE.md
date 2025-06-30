# Pegasus Docs Development Guide

## Build Commands
- Build docs: `mkdocs build`
- Serve locally with auto-rebuild: `mkdocs serve`
- View docs at: http://localhost:8000

## Project Structure
- Documentation source files in `docs/` (Markdown files)
- Configuration in `mkdocs.yml`
- Built docs go to `site/` directory (not committed to repo)

## Technology Stack
- Uses [MkDocs](https://www.mkdocs.org/) with [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) theme
- Supports Markdown (.md) files with frontmatter
- Navigation defined in `mkdocs.yml` configuration
- Built-in search functionality
- Includes plugins for redirects, minification, and enhanced markdown features

## Style Guidelines
- Use Markdown (`.md`) for all content
- Follow existing heading structure (# for top-level, ## for sections)
- Include alt text for images
- Use relative links for internal references
- Keep line length reasonable for text readability
- Document variables use `{{ variable_name }}` syntax
- Code blocks use triple backticks with language specified
- Navigation structure defined in `mkdocs.yml`

## Default Versions
- Default Node.js version: 22
- Default Python version: 3.12

## Deployment
- Automatically deployed via Cloudflare Pages from main branch

## Plugins & Features
- Search functionality via MkDocs search plugin
- URL redirects for backward compatibility
- HTML/CSS/JS minification for production builds
- Enhanced markdown with PyMdown Extensions (syntax highlighting, tabs, admonitions, etc.)
- Material theme with dark/light mode toggle
- Social media integration and analytics
