---
title: Using Docker in Development
description: Set up Django development environment with Docker Compose including PostgreSQL, Redis, Celery, and debugging configuration.
---

Pegasus optionally includes support for [Docker](https://www.docker.com/) during development.
The Docker development setup can also be used as a foundation for deploying to containerized platforms.
See [our deployment page](/deployment/overview) for more details.

### Choosing a Docker Setup

When configuring your Pegasus project to use Docker, you can select from two different options:
**services-only**, and **full-Docker development**.

In **services-only mode**, Docker is only used to run the external services: PostgreSQL and Redis. The Django server, Celery and any other processes are run directly on the local machine.
In this mode, you don't need to install PostreSQL and Redis on your local machine, which simplifies the setup and maintenance. You also have direct access to the other dev processes which simplifies debugging and inspection.
The main downside of services-only mode is that it requires installing `uv` and `npm`.

In **full-Docker** mode, Docker is used to run the services, as above, but also runs Django, npm, and Celery.
No processes are run directly on your local machine.
This mode makes it easier to get up and running---since all you need to install is Docker---but it can make
development more complicated, since all the processes are running inside Docker.

As a rough guideline: **If you are comfortable installing and running Python and Node.js on your machine, use services-only mode. Otherwise, use full-Docker mode.**

### Prerequisites

You need to install [Docker](https://www.docker.com/get-started) prior to setting up your environment.

Mac users have reported better performance on Docker using [OrbStack](https://orbstack.dev/),
which is a Docker Desktop alternative optimized for performance.

Windows users may need to install a 3rd-party package to run `make` commands.
The easiest way to do that is via [these instructions](https://stackoverflow.com/a/57042516/8207).

### Starting your application


## Services only mode

The `docker-compose.yml` file will only include container definitions for PostgreSQL and Redis. To start the Docker services use:

```bash
docker-compose up -d

# You can stop them using
docker-compose down
```

The containers listed below should be running with their default ports exposed. Use `docker ps` to check.

| Container Name | Purpose                              | Port |
|----------------|--------------------------------------|------|
| `db`           | Runs  Postgres (primary Database)    | 5432 |
| `redis`        | Runs Redis (Cache and Celery Broker) | 6379 |


Now proceed with the remaining setup as described in the [getting started guide](/getting-started#get-up-and-running-with-native-python). You can skip the 'Set up database' step.

## Full Docker dev mode

All services will be run in Docker including the database, cache, Django dev server and Celery.

First set up your Pegasus project with Docker enabled and using Postgres as a database
following the [getting started guide](/getting-started).

### Enter the project directory

```bash
cd {{ project_name }}
```

### Run the initialization script

```bash
make init
```

This will spin up a database, web worker, celery worker, and Redis broker and create and
run your database migrations.

Note: users of older versions of Windows may [need to install "make" separately to use it](https://stackoverflow.com/questions/32127524/how-to-install-and-use-make-in-windows).
Alternatively, you can just inspect the `Makefile` in the repository and run the commands manually
(e.g. `docker compose up -d`).

### Load server

Visit [http://localhost:8000/](http://localhost:8000/) in a browser and you
should be up and running!

## Using the Makefile

Pegasus ships with a self-documenting `Makefile` that will run common commands for you,
including starting your containers, performing database operations, and building your front end.

You can run `make` to list helper functions, and you can view the source
of the `Makefile` file in case you need to add to it or run any once-off commands.

Most of the commands you might need to run in your project will involve running something like:

```bash
docker compose exec <container> <command>
```

The `Makefile` has many example of these you can refer to if you need to run a specific command against
a specific container.

## Architecture and how it works

### Containers

The Docker configuration is primarily in `docker-compose.yml`.

Depending on your project settings, there are several containers that might be running.
These are outlined in the table below:

| Container Name | Purpose                               | Included                                                                    |
|----------------|---------------------------------------|-----------------------------------------------------------------------------|
| `db`           | Runs  Postgres (primary Database)     | Always                                                                      |
| `redis`        | Runs Redis (Cache and Celery Broker)  | Always                                                                      |
| `web`          | Runs Django                           | Always                                                                      |
| `vite`         | Runs Vite (for CSS/JavaScript assets) | If [building with Vite](/front-end/vite)                                |
| `celery`       | Runs Celery (for background tasks)    | If [Celery is enabled](/celery)                                         |
| `frontend`     | Runs the React Front End              | If [the standalone front end is enabled](/experimental/react-front-end) |


### Settings

The docker environment sets environment variables using the included `.env` file.

The `.env` file is automatically ignored by git, so you can put any additional secrets there.
It generally should not be checked into source control.
You can instead add variables to `.env.example` to show what should be included.

### Python environments

The Python environment is run in the containers, which means you do not need to have your
own local environment if you are always using Docker for development.
Python requirements are automatically installed when the container builds.

However, keep in mind that if you go this route, you will need to run all commands inside the containers
as per the instructions below.

## Running once-off management commands

Running commands on the server can be done using `docker compose`, by following
the pattern used in the `Makefile`.

For example, to bootstrap Stripe subscriptions, run:

```bash
docker compose exec web python manage.py bootstrap_subscriptions
```

Or to promote a user to superuser, run:
```bash
docker compose exec web python manage.py promote_user_to_superuser me@example.com
```

You can also use the `make manage` command, passing in `ARGS` like so:

```bash
make manage ARGS='promote_user_to_superuser me@example.com'
```

You can add any commonly used commands you want to `custom.mk` for convenience.

## Updating Python packages

If you add or modify anything in your `requirements.in` (and `requirements.txt`) files, you will have to rebuild
your containers.

The easiest way to add new packages is to add them to `requirements.in` and then run:

```bash
make requirements
```

Which will rebuild your `requirements.txt` file, rebuild your Docker containers,
and then restart your app with the latest dependencies.

## Debugging

You can use debug tools like `pdb` or `ipdb` by enabling service ports.

This can be done by running your web container with the following:

```bash
docker compose run --service-ports web
```

If you want to set up debugging with PyCharm, it's recommended to follow [this guide on the topic](https://testdriven.io/blog/django-debugging-pycharm/).

## Troubleshooting

### "No such file or directory" errors

Some environments---especially on Windows---can have trouble finding the files on your local machine.
This will often show up as an error like this when starting your app:

```
python: can't open file '/code/manage.py': [Errno 2] No such file or directory
```

These issues are usually related to your *disk setup*.
For example, mounting your code on a remote filesystem or external drive to your machine.
To fix, try running the code on the same drive where Docker Desktop is installed,
or on your machine's default "C:" drive.

You can also get around this issue by running your application natively, instead of with Docker.

## Other Resources

- [Dockerizing Django with Postgres, Gunicorn, and Nginx](https://testdriven.io/blog/dockerizing-django-with-postgres-gunicorn-and-nginx/)
  provides an overview of the setup, and has additional information about using Docker in production
- [Environment variables in Compose](https://docs.docker.com/compose/environment-variables/) is a good resource
  on the different ways to work with environment variables in Docker
