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

```shell
npm run dev
```

Or in Docker:

```shell
make npm-dev
```
This command will also automatically refresh your front end whenever any changes are made. 

## Adding files to Django templates

To add CSS / JS files to Django templates you can use the `vite_asset` template tag from django-vite:

```shell
{% load django_vite %}
{% vite_asset '<path to your asset>' %}
```

If you are using React you also need to add the `vite_react_refresh` tag to get HMR working:

```shell
{% load django_vite %}
{% vite_react_refresh %}
{% vite_asset '<path to your React asset>' %}
```

## Configuration

The [django-vite docs](https://github.com/MrBin99/django-vite) provide details about the vite configuration.
Here is the relevant declaration from `settings.py`:

```shell
DJANGO_VITE = {
    "default": {
        "dev_mode": env.bool("DJANGO_VITE_DEV_MODE", default=DEBUG),
        "manifest_path": BASE_DIR / "static" / ".vite" / "manifest.json",
    }
}
```

This should work without modification for most projects.
If for some reason you want to change your vite server port or base path in `vite.config.ts` you will have to make
corresponding changes to your `django-vite` settings as per their documentation.
