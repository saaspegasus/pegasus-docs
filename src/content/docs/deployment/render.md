---
title: Render
description: Render
---

## Render

Pegasus supports deploying to [Render](https://render.com/) as a standard Python application.

### Prerequisites

If you haven't already, create your Render account.

To use celery you will need to upgrade to a paid plan.

### Deploying

Once you've logged into Render you can create your app as follows:

1. In the Render dashboard, create a new blueprint
2. Connect your GitHub or Gitlab account and select your project's repository
3. Configure the *Blueprint Name* and select the branch you want to deploy from
4. Review the configuration, add settings and click 'Apply'

This will kick off the process to create your PostgreSQL database and Redis instances as well
as deploy your web application (configured in your project's `render.yaml` file).

**After deploying, review the [production checklist](/deployment/production-checklist.md) for a list
of common next steps**

### Build Script

The `build.sh` file is run by Render to run the commands needed to build the app,
as [described here](https://render.com/docs/deploy-django#create-a-build-script).
This is also where "release" commands like `collectstatic` and `migrate` run.

If there are other commands (e.g. `./manage.py bootstrap_subscriptions`)
that you want to run on every deploy you can add them to `build.sh`.

If you enable celery, it will use the `build_celery.sh` file, which runs the basic build steps,
but not the "release" commands.
You generally should not need to modify this file.

#### (Optional) Running Migrations in the Release Phase

If you want, you can optionally run the database migrations in the release phase using
Render's [Deploy steps](https://render.com/docs/deploys#deploy-steps) functionality.

This is not required, and notably **it is not supported on Render's free tier**,
but may lead to a more consistent deployment process.

To do this, first remove the following lines from `deploy/build.sh`:

```bash
echo "Running database migrations"
python manage.py migrate
```

Then create the following file at `deploy/pre_deploy.sh`:

```bash
#!/usr/bin/env bash
# exit on error
set -o errexit

export DJANGO_SETTINGS_MODULE={{cookiecutter.project_slug}}.settings_production

echo "Running database migrations"
python manage.py migrate
```

Finally, add the following line to your `render.yaml` file, after the `buildCommand`:

```yaml
    preDeployCommand: "./deploy/pre_deploy.sh"
```

After completing these steps, migrations will run in the pre-deploy phase.

### Settings and Secrets

Render builds use the `settings_production.py` file.
You can add settings here or in the base `settings.py` file, and use environment variables to manage any secrets,
following the examples in these files.

Environment variables can be managed from the "Environment" tab on your app's dashboard.

### Running One-Off Commands 

You can run one-off commands in the Render shell (paid plan required) or [via SSH](https://render.com/docs/ssh).

### Celery Support

To run celery workers on Render you will need to upgrade to a paid plan.

Then in your `render.yaml` file uncomment the 'celery' section and rebuild from the steps above.

If you previously deployed your application you can choose "Update Existing Resources" to avoid having
to recreate your app / database / redis instance.

### Troubleshooting

**Sometimes Render fails to build on the first deployment.**
Retrying the deployment from the same commit seems to resolve this.


### Container-based deployment

It is possible to use Render's docker-based support to deploy Pegasus apps, but it is not recommended
because there is no "release" phase, which makes it difficult to set up things like database migrations.

More details can be found in [this support thread](https://community.render.com/t/release-command-for-db-migrations/247/7).
