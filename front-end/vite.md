Vite-Specific Instructions
===========================

## Vite architecture overview

The Vite integration with Django is managed by [`django-vite`](https://github.com/MrBin99/django-vite).
Big picture this works in two ways:

1. In *development* front end assets are served directly from Vite's server
2. In *production* front end assets are built and served through Django's static files system.

This toggle is configured through the `"dev_mode"` setting in your default `DJANGO_VITE` config in `settings.py`.
Out of the box, this setting is tied to the `settings.DEBUG` flag.

## Vite in Development

Unlike Webpack, Vite does *not* use bundle files in development.
Instead, your front end files are served by Vite's development server (which is configured though `django-vite`).

This workflow makes gives you the benefit of added speed and fast page updates without reloading your browser,
but it does mean that **your Vite server must be running at all times during development**.

To run your Vite server and serve your front end files you should run:

```commandline
npm run dev
```

Or in Docker:

```commandline
make npm-dev
```
This command will also automatically refresh your front end whenever any changes are made. 
