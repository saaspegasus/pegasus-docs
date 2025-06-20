# Pegasus Documentation

Documentation for [SaaS Pegasus: the Django SaaS Boilerplate](https://www.saaspegasus.com/).

The latest docs can be found at [docs.saaspegasus.com](https://docs.saaspegasus.com/).

This project uses [Sphinx](https://www.sphinx-doc.org/).

## Installation

Install using your favorite version [from Sphinx's options](https://www.sphinx-doc.org/en/master/usage/installation.html).

The maintainer uses the pip version via `pip install -r requirements.txt`

## Building Docs

To build docs run `make html`.

## Viewing docs locally

You can use `sphinx-autobuild` to serve your docs locally and watch for changes:

```
sphinx-autobuild . _build/html/ --port 8001
```

The docs should now be visible at [http://localhost:8001](http://localhost:8001).

## Deployment

Deployment is handled by Cloudflare. The latest main branch is automatically deployed via Cloudflare Pages.
