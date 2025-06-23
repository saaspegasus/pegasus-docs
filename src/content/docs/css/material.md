---
title: The Material Theme (deprecated)
description: The Material Theme (deprecated)
---

The Material Theme (deprecated)
===============================

**This theme has been deprecated.**

This means that the theme is in maintenance-only mode, and support will be dropped by the end of 2025.
Existing projects can continue using the theme, but new projects should not, and new Pegasus features will eventually
not be developed and tested on the theme.

The reason for this is that several Pegasus customers have complained about the lack of documentation and support for
this theme from its maintainer, Creative Tim.
Additionally, their process around updating the theme has entailed releasing large, poorly-documented updates
which have been difficult for me to incorporate back into Pegasus.

The following documentation is for people already using the material theme. 

## Customizing the Material theme

The customization process outlined above largely works for the Material theme as well.

For example, you can change the primary color from the default magenta to a dark green by adding the 
following lines towards the top of `assets/styles/site-bootstrap.scss`:

```scss
// Configuration
@import "~bootstrap/scss/functions";

// add these lines
$primary: #2e7636;  // change primary color + gradients to green
$primary-gradient: #2e7676;
$primary-gradient-state: #2e7676;
```

You will also have to [build your front end](/front-end/overview.md) to see the changes.

Material has more customization options than the default theme, which can be found in the [Material Dashboard documentation](https://www.creative-tim.com/learning-lab/bootstrap/overview/material-dashboard).
The theme files live in the `assets/material-dashboard` folder.
You can see the modifications that have been made for Pegasus support [on Github here](https://github.com/creativetimofficial/material-dashboard/compare/master...czue:pegasus-tweaks).
In particular, a few bugs have been fixed, and the unused pro files have been removed.

Creative Tim offers pro versions of [Material Dashboard](https://www.creative-tim.com/product/material-dashboard-pro) and
[Material Kit](https://www.creative-tim.com/product/material-kit-pro) which are helpful if you want to have access to more
pages / components. These should integrate seamlessly with the Pegasus theme.

### Enabling Material's JavaScript

Pegasus doesn't ship with the Material theme JavaScript built in. If you would like to use their JavaScript functionality
(required for many of their components) you can take the following steps:

1. Download [the `material-kit.min.js` file from Creative Tim's Github repository](https://github.com/creativetimofficial/material-kit/blob/master/assets/js/material-kit.min.js).
2. Copy it into your Django static directory. For example, to `<project_root>/static/js`
3. Add it to the `<head>` section of your `base.html` template (or wherever you want to use it):

```html
<script src="{% static 'js/material-kit.min.js'%}"></script>
```

After completing these steps, the Material Kit JavaScript functionality should work.

