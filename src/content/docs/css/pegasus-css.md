---
title: Pegasus CSS
description: Cross-framework CSS classes with pg- prefixes for consistent styling across Bootstrap, TailwindCSS, and Bulma using Sass @extend and @apply.
sidebar:
  order: 3
---

Pegasus historically shipped a set of CSS classes prefixed with `pg-` to provide compatibility
across its supported CSS frameworks (Tailwind, Bootstrap, and Bulma).
These classes are proxies for similar classes provided by the underlying frameworks themselves,
and are created using the Sass [`@extend` helper](https://sass-lang.com/documentation/at-rules/extend)
or Tailwind's [`@apply` helper](https://tailwindcss.com/docs/reusing-styles#extracting-classes-with-apply).

## Default Behavior (Tailwind)

**By default, Pegasus outputs native Tailwind and DaisyUI classes in your templates.**

For example, a button that previously used `pg-button-primary` will output `btn btn-primary` (a DaisyUI class).
A title that used `pg-title` will output `text-3xl font-bold mb-2` (Tailwind utilities).

This means you can style your app using the standard Tailwind and DaisyUI documentation directly,
without needing to learn or look up the Pegasus-specific class names.

## Legacy pg- Classes

If you prefer to continue using `pg-` prefixed classes, you can enable them by checking the
"Use Pegasus CSS classes" checkbox in your project configuration.
This will output the `pg-` classes in your templates instead of native Tailwind classes.

This is useful if:

- You are using **Bootstrap** or **Bulma** (where `pg-` classes are always used).
- You have an existing project with significant custom code using `pg-` classes and aren't ready to migrate yet.

### Migrating from pg- Classes to Native Classes

If you have an existing project using `pg-` classes and want to switch to native Tailwind/DaisyUI classes,
there are two steps:

**1. Uncheck "Use Pegasus CSS classes" in your project settings.**

In your project on [saaspegasus.com](https://www.saaspegasus.com/), go to
**Developer Setup → Advanced** and uncheck **Use Pegasus CSS classes**.
This tells Pegasus to output native Tailwind/DaisyUI classes in future builds.

**2. Migrate your existing templates and JavaScript files.**

Use the `pegasus migrate-css` command from the [Pegasus CLI](https://github.com/saaspegasus/pegasus-cli)
to convert any `pg-` classes in your own code to their native equivalents:

```bash
# Preview what would change
pegasus migrate-css --dry-run

# Do the migration
pegasus migrate-css
```

The command reads class mappings from your project's `assets/styles/pegasus/tailwind.css`,
so it should match the version of Pegasus your project was built with.
See the [pegasus-cli README](https://github.com/saaspegasus/pegasus-cli#migrating-pg--css-classes)
for additional options (e.g. `--css-file` and `--search-dir` for non-standard project layouts).


## Class Reference

Pegasus CSS classes are defined in `assets/styles/pegasus/<framework>.sass/css`.
The following table shows the most common classes and their values across frameworks.

| Pegasus Class   | Description         | Value in Bootstrap | Value in Tailwind                                               | Value in Bulma   |
|-----------------|---------------------|--------------------|-----------------------------------------------------------------|------------------|
| `pg-columns`    | Wrapper for columns | `row gy-4`         | `flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0` | `columns`        |
| `pg-column`     | Individual column   | `col-md`           | `flex-1`                                                        | `column`         |
| `pg-title`      | A title             | `h3` (element)     | `text-3xl font-bold mb-2`                                       | `title`          |
| `pg-subtitle`   | A subtitle          | `lead`             | `text-xl mb-1`                                                  | `subtitle`       |
| `pg-button-***` | A styled button     | `btn btn-***`      | `btn btn-***` (from daisyUI)                                    | `button is-***`  |
| `pg-text-***`   | Colored text        | `text-***`         | `text-***` (from daisyUI)                                       | `has-text-***`   |

For a full list of classes and their mappings, see `assets/styles/pegasus/` in your project.

## Classes Not Covered by Migration

Some `pg-` classes use more complex CSS (not simple utility mappings) and are not affected by the migration.
These classes remain as `pg-` in all builds and should continue to be referenced by their `pg-` names:

- **`pg-breadcrumbs`**, **`pg-breadcrumb-active`** — breadcrumb navigation with nested styling rules.
- **`pg-select`** — wraps a nested `<select>` element with framework-specific styles.
- **`pg-bg-danger`**, **`pg-bg-success`** — dynamically constructed at runtime.
- **Chat components** (`pg-chat-*`, `pg-message-*`, `pg-avatar`) — complex component styles for the chat UI.

These classes are defined in `assets/styles/pegasus/` and `assets/styles/app/` and can be customized there.
