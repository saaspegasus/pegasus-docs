# Bootstrap

There are two Bootstrap themes, both of which use Bootstrap version 5.

## Choosing your theme

The default Bootstrap theme is based off the default settings that ship with Bootstrap.
It provides a simple, practical starting point that is easy to customize and extend.
This theme is recommended for all new projects using Bootstrap.

There is also a deprecated theme is based on Creative Tim's [Material Kit](https://www.creative-tim.com/product/material-kit)
and [Material Dashboard](https://www.creative-tim.com/product/material-dashboard) products.
White this theme is flashier than the default theme, it has been retired due to developer experience issues.
It is not recommended except for legacy projects, as support will be dropped in the future.

## Customizing the theme

Pegasus's file structure is based on [the Bootstrap documentation](https://getbootstrap.com/docs/5.0/customize/sass/#importing).
Any of the variables used in Bootstrap can be changed by modifying the `assets/styles/site-bootstrap.scss` file.

A complete list of available variables can be found in `./node_modules/bootstrap/scss/variables`.

Try adding the following lines to your file (after importing `functions`) to see how it changes things:

```scss
// Configuration
@import "~bootstrap/scss/functions";

$primary: #2e7636;  // change primary color to green
$body-color: #00008B;  // change main text to blue

// rest of file here...
```

**You'll have to run `npm run dev` to see the changes take.**
For more details on building the CSS files, see the [front end documentation](/front-end/).

The [Bootstrap documentation](https://getbootstrap.com/docs/5.0/customize/sass/) has much more detail
on customizing your theme!

## Working with JavaScript in Django templates

If you want to call bootstrap JavaScript from a Django template file, you can make the bootstrap library
(or subsets of it) available on the browser window.

To make all of bootstrap available, you can modify `site-bootstrap.js`b to just be these lines:

```javascript
require('./styles/site-bootstrap.scss');
window.bootstrap = require('bootstrap');
```

After [rebuilding the front end](/front-end/overview.md) you can then call bootstrap in a Django template like this:

```django
{% block page_js %}
<script>
  document.addEventListener('DOMContentLoaded', function() {
    const onLoadModal = new bootstrap.Modal(document.getElementById('onLoadModal'));
    onLoadModal.show();
  });
</script>
{% endblock %}
```

This example will open the modal with ID `onLoadModal` on page load.

Alternatively, you can add individual bootstrap javascript modules via `site-bootstrap.js` like this:

```javascript
require('./styles/site-bootstrap.scss');
// <other require statements here>
window.Modal = require('bootstrap/js/dist/modal');  // modals (used by teams)

```

And then call it in a Django template like this (with no `bootrap.` prefix):

```javascript
const onLoadModal = new Modal(document.getElementById('landing-page-modal'));
```
