# Pegasus Documentation

Documentation for [SaaS Pegasus: the Django SaaS Boilerplate](https://www.saaspegasus.com/).

The latest docs can be found at [docs.saaspegasus.com](https://docs.saaspegasus.com/).

This project uses [MkDocs](https://www.mkdocs.org/) with [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) for documentation.

## Installation

Install MkDocs and dependencies:

```bash
uv sync
```

## Building Docs

To build docs run:

```bash
uv run mkdocs build
```

## Viewing docs locally

You can serve your docs locally with auto-reload:

```bash
uv run mkdocs serve
```

The docs will be visible at [http://localhost:8000](http://localhost:8000).

## Project Structure

- Documentation content in `docs/` (Markdown files)
- Configuration in `mkdocs.yml`
- Built docs go to `site/` directory (not committed to repo)

## Deployment

Deployment is handled by Cloudflare Pages. The latest main branch is automatically deployed.
