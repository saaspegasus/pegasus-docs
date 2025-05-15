Troubleshooting
===============

## Changes are not being picked when running `make npm-watch` in a Docker container

Some Docker configurations do not properly pick up file-system changes across operating systems.
This can be a problem, e.g. when running on certain Windows environments.
This causes changes made to not be automatically picked up.

This can be fixed by updating `webpack.config.js` to use polling by adding this:

```javascript
module.exports = {
   //...
   watchOptions: {
      poll: 1000,
   },
};
```

Alternatively, you can switch to installing/running NPM natively instead of in Docker.
This is a good option if you are also getting poor performance, which can also be caused
by cross-platform issues.
