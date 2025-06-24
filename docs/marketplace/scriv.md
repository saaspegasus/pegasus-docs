---
title: Working with Scriv
description: Working with Scriv
---

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
or by [connecting Scriv to a Pegasus project](connecting.md) and then changing the deployment platform in your project settings.
The latter option is only recommended if you plan on making other configuration changes, since the process of connecting
a project is more work than just copying the files across.

## The Chat Widget

The chat widget is a component that allows you to add a chat interface to your website.
You can find the source code and more information in the
[`components/scriv-chat`](https://github.com/saaspegasus/scriv/tree/main/components/scriv-chat) directory of the repository.

### Publishing your own Chat Widget Package

To publish your own version of the chat widget, you can do the following:

1. Customize the chat widget by modifying `components/scriv-chat/src/components/scriv-chat/scriv-chat.tsx`.
   1. Edit the `SCRIV` variable to match your own site.
   2. Modify the "Powered by" section at the bottom.
2. Replace `scriv-chat` with your own package name in `components/scriv-chat/package.json`, and modify any other relevant variables.
3. Publish the package, by getting set up on [npmjs.com](https://www.npmjs.com/) and then running `npm publish`.
