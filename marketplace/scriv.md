Working with Scriv
==================

## Deployment

Out of the box, Scriv is set up to deploy to fly.io via the standard SaaS Pegasus setup.
If you'd like to deploy to fly, you will first need to make the following changes to your `fly.toml` file:

- (Recommended) Choose a new `app` name that's unique to your project.
- In the `http_service.checks.headers`, change the `Host` variable to the domain you are deploying to.

After that, you should be able to follow the [standard Pegasus deployment instructions](../deployment/fly.md).

### Deploying to a different platform

If you'd rather deploy Scriv somewhere else, you can use the `Dockerfile.web` in the repo as a foundation
for any other docker-based platform. If you want to use a Pegasus-supported platform you can also generate the necessary
files by creating a new project on Pegasus and copying them into your Scriv repository,
or by [connecting Scriv to a Pegasus project](./connecting.md) and then changing the deployment platform in your project settings.
The latter option is only recommended if you plan on making other configuration changes, since the process of connecting
a project is more work than just copying the files across.
