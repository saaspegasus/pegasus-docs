Migrating from Webpack to Vite
==============================

This page describes how to migrate your project from Webpack to Vite.

## 1. Upgrade your project to 2025.5

First upgrade your project to 2025.5 [according to the normal process](/upgrading.md).
Do *not* change your bundler setting at this stage.

Do normal testing and verification that everything is working with Webpack on version 2025.5.

## 2. React only: Rename all `.js` files using JSX to `.jsx`

Vite is stricter than Webpack about file extensions, so any file that uses JSX syntax (i.e. React code),
needs to be in a file with a `.jsx` extension.

After changing the extensions of your files you may need to tweak your JavaScript imports.
You'll also need to modify your `webpack.config.js` file if any referenced files have changed.

## 3. Change your bundler setting from "Webpack" to "Vite" and do another Pegasus upgrade

Next, in your project settings, change the bundler to "Vite" and perform another upgrade.

This should handle *most* of the Webpack --> Vite migration for you, including migrating your npm packages,
build commands, and built-in CSS / JavaScript bundles.

During this step *do not delete your `webpack.config.js` file*, as you'll want to reference it for the next step.

## 4. Add your custom CSS / JavaScript exports to your vite config

Next find the `entry` section of your project's `webpack.config.js` that configures your exported bundle files.
It will look something like this, though the exact files listed will depend on your project settings:

```javascript
entry: {
    'site-base': './assets/site-base.js',  // base styles shared between frameworks
    'site-tailwind': './assets/site-tailwind.js',  // required for tailwindcss styles
    site: './assets/javascript/site.js',  // global site javascript
    app: './assets/javascript/app.js',  // logged-in javascript
    dashboard: './assets/javascript/shadcn-dashboard/index.jsx',
    teams: './assets/javascript/teams/teams.jsx',
    'edit-team': './assets/javascript/teams/edit-team.jsx',
    'chat': './assets/javascript/chat/chat.jsx',
  },
```

Importantly, *if you have added or changed anything in this section, you will need to re-apply those changes to 
the `build.rollupOptions.input` section of `vite.config.ts`.*
The section that you need to modify will look something like this:

```javascript
  build: {
    rollupOptions: {
      input: {
        'site-base': path.resolve(__dirname, './assets/site-base.js'),
        'site-tailwind': path.resolve(__dirname, './assets/site-tailwind.js'),
        'site': path.resolve(__dirname, './assets/javascript/site.js'),
        'app': path.resolve(__dirname, './assets/javascript/app.js'),
        'dashboard': path.resolve(__dirname, './assets/javascript/shadcn-dashboard/index.jsx'),
        'teams': path.resolve(__dirname, './assets/javascript/teams/teams.jsx'),
        'edit-team': path.resolve(__dirname, './assets/javascript/teams/edit-team.jsx'),
        'chat': path.resolve(__dirname, './assets/javascript/chat/chat.jsx'),
      },
```

You should update this in the same pattern with any changes you have made to your webpack config.

## 5. Update your front end file references in templates

Finally, update any Django templates you had that imported bundle files.
Specifically, reference that look something like this:

```html
{% block page_js %}
  <script src="{% static 'js/app-bundle.js' %}" defer></script>
{% endblock %}
```

Will need to be updated to:

```html
{% block page_js %}
  {% vite_asset 'assets/javascript/app.js' %}
{% endblock %}
```

Note that this uses the *source* file path instead of the bundle file.

You will also need to add `{% load django_vite %}` to the top of the template.
And if the flie uses React you'll also need to add the `{% vite_react_refresh %}` tag to the `page_js` section.

## 6. Update Webpack libraries

*Most projects won't need to do this.*

If you have added any code that relies on [Pegasus's `SiteJS` library](/front-end/design-patterns.md#using-the-sitejs-library)
you will need to update it to explicitly expose itself on the window object.

In the associated JavaScript file (in this case `library.js`), you need to change something like:

```javascript
export MyLibrary;
```

To:
```javascript
if (typeof window.SiteJS === 'undefined') {
  window.SiteJS = {};
}

window.SiteJS.library = {
  MyLibrary: MyLibrary,
}
```

## 7. Rebuild and run your front end

Finally, rebuild and run your front end, according to the [vite docs](/front-end/vite.md):

```
npm install
npm run dev
```

And confirm everything is working as expected.
Once everything is working as expected, you can delete your `webpack.config.js` file.

If you run into any issues during the migration, reach out via standard support channels.
