# Pegasus Documentation

Documentation for [SaaS Pegasus: the Django SaaS Boilerplate](https://www.saaspegasus.com/).

The latest docs can be found at [docs.saaspegasus.com](https://docs.saaspegasus.com/).

This project uses [Astro](https://astro.build/) with [Starlight](https://starlight.astro.build/) for documentation.

## Installation

Install dependencies using npm:

```bash
npm install
```

## Building Docs

To build docs run:

```bash
npm run build
```

## Viewing docs locally

You can serve your docs locally with auto-reload:

```bash
npm run dev
```

The docs will be visible at [http://localhost:4321](http://localhost:4321).

## Project Structure

- Documentation content in `src/content/docs/` (Markdown files)
- Configuration in `astro.config.mjs`
- Built docs go to `dist/` directory (not committed to repo)

## Deployment

Deployment is handled by Cloudflare Pages. The latest main branch is automatically deployed.
