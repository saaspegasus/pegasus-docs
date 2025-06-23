---
title: Webpack-Specific Instructions
description: Webpack-Specific Instructions
---

Webpack-Specific Instructions
=============================

## Development with Webpack

Whenever you make modifications to the front-end files you will need to run
the following command to rebuild the compiled JS bundles and CSS files:

```bash
npm run dev
```

You can also set it up to watch for changes by running:

```bash
npm run dev-watch
```

or in Docker:

```
make npm-watch
```

## Bundled Static Files and Source Control

For ease of initial set up, the front-end bundle files can be optionally included with the Pegasus codebase.
This allows you to get up and running with Pegasus without having to set up the Webpack build pipeline.

However, keeping these files in source control will typically result in a lot of unnecessary changes and merge conflicts.
Instead, it is recommended that you add the compiled CSS and JavaScript bundle files to your `.gitignore`
so they are no longer managed by source control, and have your developers build them locally using the steps above.
**You can switch to this workflow by unchecking the "include static files" option in your project configuration.**

For production deployment, see the [production guidance](deployment/production-checklist.md#optimize-your-front-end) on this.
