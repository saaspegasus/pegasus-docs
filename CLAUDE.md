# Pegasus Docs Development Guide

## Build Commands
- Build docs: `make html`
- Serve locally with auto-rebuild: `sphinx-autobuild . _build/html/ --port 8001`
- View docs at: http://localhost:8001

## Project Structure
- Documentation source files in `.md` (Markdown) and `.rst` (reStructuredText)
- Configuration in `conf.py`
- Built docs go to `_build/` directory (not committed to repo)

## Style Guidelines
- Use Markdown (`.md`) for new content when possible
- Follow existing heading structure (# for top-level, ## for sections)
- Include alt text for images
- Use relative links for internal references
- Keep line length reasonable for text readability
- Document variables use `{{ variable_name }}` syntax
- Code blocks use triple backticks with language specified

## Default Versions
- Default Node.js version: 22
- Default Python version: 3.12

## Deployment
- Automatically deployed via Netlify from main branch