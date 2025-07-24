---
title: CSS File Structure
description: Understand Pegasus CSS file organization with framework-independent styles and framework-specific overrides compiled from assets to static directories.
sidebar:
  order: 2
---

CSS source files live in the `assets/styles` folder, and are compiled into the `static/css` folder.
Some Pegasus styles are written using [Sass](https://sass-lang.com/), which provides many benefits
and features on top of traditional CSS.

**Modifying CSS requires having a functional [front-end build setup](/front-end/overview).**

All versions of Pegasus contain two main sets of styles:

- Styles that are *framework-independent* are contained and imported in `assets/styles/app/base.sass` 
  and compiled into `static/css/site-base.css`.
- Styles that *extend or override the CSS framework* are contained in `assets/styles/app/<framework>/`
  and compiled into `static/css/site-<framework>.css`.

This split is not required, and you can optionally combine everything into a single file by importing the styles 
from `base.sass` into your framework file and deleting `site-base.css`.
