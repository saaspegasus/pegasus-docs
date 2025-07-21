---
title: Bulma
description: Customize Bulma CSS framework using Sass variables for colors, typography, and styling in your Pegasus application.
---

Bulma is readily customizable via [Sass variables](https://bulma.io/documentation/customize/variables/).
Any of the variables used by Bulma can be changed by modifying the `assets/styles/site-bulma.scss` file.

Try adding the following lines to the top of your file to see how it changes things:

```scss
$primary: #2e7636;  // change primary color to green
$body-color: #00008B;  // change main text to blue
```

**You'll have to run `npm run dev` to see the changes take.**
For more details on building the CSS files, see the [front end documentation](/front-end/overview).
