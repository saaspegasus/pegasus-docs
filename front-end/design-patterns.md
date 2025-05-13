Front End Design Patterns
=========================

This section provides guidance on common front end tasks.

## Providing site-wide JavaScript

Sometimes you need access to a library or piece of code you've written on many different pages.
Pegasus has a few patterns for dealing with this.

### `site.js` and `app.js`

There are two "site-wide" JavaScript files used in Pegasus.

The `site.js` file contains code that you want loaded *on every page*.
Its bundle file (`site-bundle.js`) is included in your `base.html`.
This is a good place to put global code, library imports, etc. which should always be available.

The `app.js` file contains code that you want loaded *on some pages---typically after login.
This is a good place to put helper functions that are only used in a few places.
The `app-bundle.js` file is *not* included by default, and so must be explicitly added to any page that needs it,
like this:

Vite:

```html
{% load django_vite %}
{% block page_js %}
  {% vite_asset 'assets/javascript/app.js' %}
{% endblock page_js %}
```

Webpack:

```html
{% load static %}
{% block page_js %}
  <script src="{% static 'js/app-bundle.js' %}"></script>
{% endblock page_js %}
```

The distinction between `site` and `app` is somewhat arbitrary---if you wanted you could create page-level
files for every function/module, or dump all your code into `site.js`.
But it's done to balance page speed and complexity.

The more individual JavaScript files you have, the less code will have to be loaded on any individual page.
This should generally make your site faster. But it's more complex to maintain as each new file needs to be
added to your `vite.config.ts`/`webpack.config.js`.

Meanwhile, dumping everything in a single file is easier to maintain, but can lead to bulky initial page load times.
After the initial load, the browser's cache should help, so this can be acceptable for most pages
(apart from your landing page / marketing site).

Because of this, Pegasus recommends keeping `site.js` lightweight, and lumping together code after login into `app.js`.
But feel free to do something differently!

## Making an existing package available

To make a library available on every page, you can follow these steps.
Note: there are many ways to do this, but this is the way it's currently handled in Pegasus.

1. Install the library via `npm install <library>`.
2. Create a javascript file for the library in `assets/javascript`.
3. Expose the library via the library's instructions. E.g. `window.library = require('library')`.
   This step will vary based on the library.
4. Import the library in your `site.js` or `app.js` file (see above for the distinction).
5. Rebuild your front end.

You can see an example with HTMX (version 2023.2 and later) or Alpine.js (version 2023.3 and later).

### Example: Adding simple-datatables

As an example, if you want to add [simple-datatables](https://github.com/fiduswriter/simple-datatables) to your project,
first install it:

```
npm install simple-datatables
```

Then add the following lines to your `site.js` file:

```javascript
import { DataTable } from 'simple-datatables';
window.DataTable = DataTable;
```

Then you can access the `DataTable` object from any page:

```javascript
// initialize the the table with id "mytable" 
const dataTable = new DataTable("#mytable", {
   searchable: true,
   fixedHeight: true,
});
```

### Using the SiteJS library

Pegasus uses [webpack libraries](https://webpack.js.org/guides/author-libraries/) to expose helper code.

You can export code in any file. For example in `app.js`:

```
export { Modals } from './web/modals';
```

Then, as long as you import the `app-bundle.js` file (as per above),
you will have all the exported code available via the `SiteJS` library. For example:

```javascript
const modal = SiteJS.app.Modals.initializeModal();
```

The structure for using something will always be:

```javascript
SiteJS.<package-name>
```

Where `<package-name>` is the name of the file in the `module.exports` section of `webpack.config.js`.
You can look at existing Pegasus examples to get a better sense of how this works.

