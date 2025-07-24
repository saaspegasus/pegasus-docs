# Pegasus Docs Development Guide

## Build Commands
- Build docs: `npm run build`
- Serve locally with auto-rebuild: `npm run dev`
- View docs at: http://localhost:4321

## Project Structure
- Documentation source files in `src/content/docs/` (Markdown files)
- Configuration in `astro.config.mjs`
- Built docs go to `dist/` directory (not committed to repo)

## Technology Stack
- Uses [Astro](https://astro.build/) with [Starlight](https://starlight.astro.build/) theme
- Supports Markdown (.md) files with frontmatter
- Auto-generated navigation from file structure
- Built-in search functionality
- Includes starlight-llms-txt plugin for AI-friendly documentation exports

## Style Guidelines
- Use Markdown (`.md`) for all content
- Include frontmatter with `title` and `description` fields
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
- Automatically deployed via Cloudflare Pages from main branch

## AI Integration
- Generates LLM-friendly documentation at `/llms.txt`, `/llms-small.txt`, and `/llms-full.txt`
- Optimized content prioritization for AI consumption
- Includes project context and useful links for LLMs
