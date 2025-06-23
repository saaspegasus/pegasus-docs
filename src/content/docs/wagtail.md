---
title: Wagtail CMS
description: Wagtail CMS
---

Wagtail CMS
===========

[Wagtail](https://wagtail.org/) is a powerful CMS (Content Management System) built on top of Django.
You can use it to create rich websites that can be edited directly via an authoring admin interface without writing any code.
It's great for creating marketing sites, blogs, and other mostly-static content.

Pegasus optionally ships with a built-in Wagtail instance that can be used as a starting point
for adding a content section and blog to any Pegasus app.

## Video Overview

This video provides an overview of the Pegasus/Wagtail functionality:

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto; margin-bottom: 1em;">
    <iframe src="https://www.youtube.com/embed/YVRhuQ9CyuQ" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
</div>

## Pegasus and Wagtail

If you want to try Wagtail make sure you enable the "Use Wagtail" option in the Pegasus codebase creator.

After you set up your application run:

```bash
./manage.py bootstrap_content
```

to initialize a few pages of content.
If you use Docker, the `make init` target will do this automatically for you.

Out-of-the-box, Pegasus will create a "content" are of your site (available at the `/content/` URL),
a blog index page (available at `/content/blog/`) and a few example blog posts.
All your content can be edited via the Wagtail admin UI (available to superusers at `/cms/` by default).

The data models for your app's content are in the `apps/content/` folder, and can be modified or extended
in the `models.py` folder there.

For more information on Wagtail, check out their [excellent documentation](https://docs.wagtail.org/).

## Adding Blog Posts

For blog posts to show up properly, their parent page should be the "Blog" index page, and their
type should be "Blog page".

You can add new blog posts by following these steps:

1. Open the Wagtail admin at the `/cms/` url.
2. In the sidebar, click on "Pages" and then the arrow (>) next to "Welcome to your content area!", then click on "Blog".
3. On the Blog page, click "add child page" and choose the "Blog page" option.
4. Fill in the details of your blog post
5. On the bottom of the page, click the up arrow (^), and click "Publish".

## Customizing Wagtail

Pegasus's default wagtail set up is intentionally bare-bones and is meant to provide a starting point for hosting a
simple blog attached to your site.

Wagtail can be used to build any complicated site and UI you can imagine.
One of the most powerful features in Wagtail is the [`StreamField` functionality](https://docs.wagtail.org/en/stable/topics/streamfield.html)
which allows you to combine other Wagtail components into a "stream-like" UI.
Your blogs and content pages will have a basic implementation using `StreamField` to get your started.  

### Wagtail CRX (CodeRed Extensions)

Some Pegasus customers recommend [Wagtail CRX](https://github.com/coderedcorp/coderedcms) as a great
way to build more complicated websites with Wagtail.
Wagtail CRX ships with a large number of components that can be used in StreamFields to build rich, dynamic content.

The previous version of Wagtail CRX was called CodeRed, it only supported Bootstrap version 4.
Wagtail CRX now supports Bootstrap 5 (the version used by Pegasus).

### Internationalization

Pegasus ships with Wagtail fully configured to support internationalization using the
`wagtail.locales` and `wagtail.contrib.simple_translation` apps bundled with Wagtail.

There are [alternative plugins][1] available which provide more advanced translation support
if necessary.

By default, Wagtail is configured to use the same set of languages as Django:

```python
LANGUAGES = WAGTAIL_CONTENT_LANGUAGES = [
    ('en', 'English'),
    ('fr', 'French'),
]
```

Full details on Wagtail localization can be found in the Wagtail [documentation][2].

Details on the Pegasus configuration for internationalization can be found on the
[internationalization](/internationalization) page.

[1]: https://docs.wagtail.org/en/stable/advanced_topics/i18n.html#translation-workflow
[2]: https://docs.wagtail.org/en/stable/advanced_topics/i18n.html

## Alternatives to Wagtail

Some companies prefer to manage their marketing sites completely separate from their application.
In this scenario it's recommended to create a separate marketing site using something like
Wordpress, Webflow, Wix, Squarespace, or any number of other options. You can host this site
at `yourdomain.com` and then host your Pegasus app separately at `app.yourdomain.com` (or similar).

If you choose to set up your content this way, you should build Pegasus without wagtail.
