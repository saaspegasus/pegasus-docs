---
title: GitHub Integration
description: Connect your Pegasus projects directly to GitHub for streamlined workflow
---

As of February, 2024 you can connect your Pegasus projects directly to GitHub instead of downloading them as a zip file.
This makes for a more streamlined workflow---especially when changing or upgrading your project.

## Watch the video

The following video shows how to create and update a project using the Github integration.

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto; margin-bottom: 1em;">
    <iframe src="https://www.youtube.com/embed/5PLO79rb--A" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
</div>

## Connecting your account

There are two ways to connect your Github account.
The Oauth-based "Connect Github" option is easier and more reliable,
while personal access token option allows you to control exactly what repositories Pegasus can access.

### Using "Connect Github" (Oauth)

The easiest way to connect your account is by using the "Connect Github" button on the project download page.
You will be prompted to accept permissions, and your account will be connected in a few seconds.

Note: While you will be prompted to grant access to "all private repository data,"
Pegasus does not view or modify data in any repositories unless you connect them.

### Using Personal Access Tokens

If you prefer not to grant Pegasus access to your entire Github account, you can use
[Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
to limit the scope of what Pegasus has access to.

#### With Classic Tokens

To use Pegasus with a classic token, visit the [Personal access tokens](https://github.com/settings/tokens) page on Github,
then select "Generate new token (classic)" from the dropdown, or [visit this page](https://github.com/settings/tokens/new).

Choose a note and expiration date for your token and grant the following scopes:

- user:email (Access user email addresses (read-only))
- repo (Full control of private repositories)
- workflow (Update GitHub Action workflows)

Then click "Generate token".
You will be taken to a page where your token is displayed.
Copy this value and paste it into the "personal access token" field from your project download page on Pegasus.
Note that you won't be able to view the token again!

#### With Fine-Grained Access Tokens

If you want the most control over your permissions, you should use a fine-grained access token,
which allow you to control access to specific repositories.

Note that if you use fine-grained tokens **you must create the repository for your project before creating the token**.
Pegasus cannot create the project for you with these tokens.

After creating the repository, [create a new fine-grained-token from this page](https://github.com/settings/personal-access-tokens/new).
Set a token name and expiration date, and then use "Only select repositories" to choose the repositories you want to
grant access to (the one you just created).

Under "Permissions" --> "Account Permissions" you must grant *read* access to:

- Email addresses

Then under "Permissions" --> "Repository Permissions" you must grant **read and write** access to:

- Contents
- Pull Requests
- Workflows

Then click "Generate token".
You will be taken to a page where your token is displayed.
Copy this value and paste it into the "personal access token" field from your project download page on Pegasus.
Note that you won't be able to view the token again!

## Connecting an existing project to Github

Projects that were created before February 2024, or that didn't use the Github integration can still be
connected to Github via a one-time process.
After completing this, you will be able to upgrade and change your Pegasus project using automatic pull requests.

First, you'll have to connect your Github account using one of the methods described above.

Next, you will need to find the commit id of the last Pegasus update you have made.
If you have never updated your codebase, this will be the first commit in the repository, which you can
find by running `git log --reverse`.

If you have updated your codebase using one of the other methods below, this will be the last commit
on the `pegasus` branch of your repository, which you can find by running `git checkout pegasus` followed by `git log`.

Once you have the commit id ready, add your existing Github repository to your Pegasus project from the downloads page.
After completing this step you will be prompted with a page that looks like this:

![Set Commit](../../assets/images/set-commit.png)

Enter the commit ID there, and you should now be able to update your project with pull requests.

## Working with repositories owned by an organization

Github organizations do not allow API-based repository access by default,
so to connect a repository owned by an organization you will also have to grant programmatic access.

Github provides detailed guidance on how to do this.
For "Connect Github," follow the [oauth instructions](https://docs.github.com/en/organizations/managing-oauth-access-to-your-organizations-data),
and for personal access tokens, follow the [personal access token instructions](https://docs.github.com/en/organizations/managing-programmatic-access-to-your-organization/setting-a-personal-access-token-policy-for-your-organization).

## Pushing Pegasus code to a subdirectory in your repository

By default, your entire git repository is dedicated to Pegasus, with all of Pegasus's files included at the root
of the repository. Some projects---especially those with a separate front end---may want to instead include Pegasus code
in a subdirectory of the repository (e.g. "backend"), so that other projects (e.g. "frontend") can be included
in the same repository.

It is possible to configure your Github integration this way. 
To do so, when adding the repository, click "Show Advanced Options," then specify the subdirectory you want to use
for your Pegasus code in the "Subdirectory" field.

If you would like to update an existing project to use a subdirectory, you'll have unlink and re-add your repository,
then [reconnect it](#connecting-an-existing-project-to-github).

## Troubleshooting

**I keep getting "Error pushing to GitHub. Please check your token scopes." when pushing my project.**

While Pegasus does its best to catch errors that come from Github and show them to you,
sometimes it will return this generic error.

One common reason a valid token is unable to push code is related to email privacy settings.
Specifically the "Blocking command line pushes that expose your personal email address" setting---which
currently must be *disabled* in order to use the Github integration.

To check and disable this setting:

1. Go to your [Github email settings](https://github.com/settings/emails)
2. Scroll down to where it says "Keep my email addresses private".
3. If that option is checked, ensure that the "Block command line pushes that expose my email" option
   below it is *not* checked.
4. If that option is *not* checked, then it is a different problem. You are welcome to reach out
   directly for support
