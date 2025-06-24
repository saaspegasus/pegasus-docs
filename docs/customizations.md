---
title: Customizations
description: The basics of customizing Pegasus to meet your application's needs
---

This page outlines the basics of customizing Pegasus to meet your application's needs.

## Personalize your landing page

Pegasus ships with a simple landing page that varies based on your selected CSS framework.
Most projects will want to highly customize the landing page from what comes out of the box.
Unless you are planning on building a marketing site on a different platform, this is likely one of the first 
things you'll do.

To modify the default landing page, you can edit the `./templates/web/landing_page.html` file
(and any included sub-templates) and make the customizations you want.

Another good option is to use a paid or open-source alternative for your marketing content.
Some recommended places to get marketing templates include:

- **Bootstrap**: [Official themes](https://themes.getbootstrap.com/), [other free recommendations](https://dev.to/bootstrap/bootstrap-5-templates-91p).
- **Bootstrap (Material)**: [Material Kit Pro](https://www.creative-tim.com/product/material-kit-pro)
- **Tailwind**: [Tailwind UI](https://tailwindui.com/), [Flowbite](https://flowbite.com/).

## Update the logged-in experience

After you've tweaked your landing page, you'll likely want to dive into the nuts and bolts that make up your app.

To modify the logged-in default page, edit the `./templates/web/app_home.html` file to your liking.

### Changing the navigation

There are two levels of navigation that ship with Pegasus, the top nav and the sidebar nav.
You'll likely want to modify both.

To change the top nav edit the `./templates/web/components/top_nav.html` file.

To change the sidebar nav edit the `./templates/web/components/app_nav.html` file.

## Styles

All of Pegasus's CSS frameworks are designed to be customized to your needs.
You can set specific colors or override the themes entirely.

How styles are customized depends on the CSS framework.
For more information, see the individual page for your framework in [the CSS docs](css/overview.md)

## Javascript

The project uses a webpack build pipeline to compile the javascript files.

For more details on how it works see the [front-end documentation](front-end/overview.md).
