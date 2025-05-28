Celery
======

[Celery](https://docs.celeryq.dev/) is a distributed task queue used to run background tasks.

It is required by several Pegasus features, including:

1. The "background task" example.
2. Per-unit subscriptions (celery runs the background task to sync unit amounts with Stripe).
3. AI Chat (it is used in all builds to set chat names, and, if async is not enabled, for the chats themselves).

If you aren't using any of the above features, you can disable celery by unchecking the "use celery" 
option---added in version 2025.1---in your project settings.
**If you *are* using any of the above features, this option will not do anything.**

## Quick Start

**If you're using [Docker in development](/docker/) then Celery should automatically be configured and running.
The instructions in this section are for running Celery outside of Docker.**

The easiest way to get going in development is to [download and install Redis](https://redis.io/download) 
(if you don't already have it) and then run:

*With uv:*

```python
uv run celery -A {{ project_name }} worker -l info --pool=solo
```

*With standard Python:*

```python
celery -A {{ project_name }} worker -l info --pool=solo
```

Note that the 'solo' pool is recommended for development but not for production. When running in production,
you should use a more robust pool implementation such as `prefork` (for CPU bound tasks) or `gevent` (for I/O bound
tasks).

### Running Celery with Gevent

The `gevent` pool is useful when running tasks that are I/O bound which tends to be 90% of tasks. The same
configuration can also be used to run Celery on Windows (if the `solo` pool is not suitable) since 
Celery 4.x [no longer officially supports Windows](https://docs.celeryq.dev/en/4.0/whatsnew-4.0.html#removed-features).

To use the `gevent` pool, change the concurrency pool implementation to ``gevent`` instead.

``` console
pip install gevent
celery -A {{ project_name }} worker -l info -P gevent
```

For more information see the [Celery documentation](https://docs.celeryq.dev/en/stable/userguide/concurrency/gevent.html).

## Setup and Configuration

The above setup uses [Redis](https://redis.io/) as a message broker and result backend.
If you want to use a different message broker, for example [RabbitMQ](https://www.rabbitmq.com/),
you will need to modify the `CELERY_BROKER_URL` and `CELERY_RESULT_BACKEND` values in `settings.py`.

More details can be found in the [Celery documentation](https://docs.celeryq.dev/en/stable/getting-started/backends-and-brokers/index.html).

## Monitoring with Flower

[Flower](https://flower.readthedocs.io/en/latest/) is an open-source web application for monitoring and managing Celery clusters.
It provides real-time information about the status of Celery workers and tasks.

If you'd like to use Flower in development, add the following to the `services` section of your `docker-compose.yml`:

```yaml
  flower:
    image: mher/flower
    environment:
      - CELERY_BROKER_URL=redis://redis:6379
    command: celery flower
    ports:
      - 5555:5555
    depends_on:
      - redis
```

In production, you will likely want to run Flower behind a private VPN, or [set up authentication](https://flower.readthedocs.io/en/latest/auth.html)
on your Flower instance, and use a [reverse proxy](https://flower.readthedocs.io/en/latest/reverse-proxy.html) to expose it.

## Scheduled Tasks with Celery Beat

[Celery Beat](https://docs.celeryq.dev/en/stable/userguide/periodic-tasks.html) is a scheduler that triggers tasks at regular intervals, which can be used to run periodic tasks like daily reports, or sending scheduled notifications.

### Configuration

By default, Celery Beat will store the schedule in a shelve database file. When running in a production environment and especially in a containerized environment, you should use persistent storage to store the schedule. Pegasus is pre-configured to store the schedule in the Pegasus database using `django-celery-beat`.

You can place the schedule task definitions in the `SCHEDULED_TASKS` setting in your `settings.py` file and then run the `bootstrap_celery_tasks` management command to create the tasks in the database.

```python
from celery.schedules import crontab

SCHEDULED_TASKS = {
    'example-task-every-morning': {
        'task': '{{ project_name }}.tasks.example_task',
        'schedule': crontab(hour=7, minute=0),  # Run every day at 7:00 AM
    },
    'another-example-every-hour': {
        'task': '{{ project_name }}.tasks.another_example',
        'schedule': 3600.0,  # Run every hour (in seconds)
        'args': (16, 16),  # Arguments to pass to the task
    },
}
```

```shell
python manage.py bootstrap_celery_tasks --remove-stale
```

This will create or update the tasks in the database and remove any stale tasks that are no longer defined in `SCHEDULED_TASKS`.

If you want to bootstrap the tasks automatically during you application deploy process you can do so by running the bootstrap command alongside the Django migration command.

### Running Celery Beat

To run Celery Beat in development:

*With uv:*

```shell
# Alongside the Celery worker, you can run Celery Beat
uv run celery -A {{ project_name }} worker -l info --beat

# AS a dedicated process
uv run celery -A {{ project_name }} beat -l info
```

Note that if you run Celery Beat as a standalone process, you will need to ensure that the Celery worker is running separately. This is because Celery Beat is responsible for scheduling tasks, while the worker executes them.

#### Production Setup

In production, you can run Celery Beat as a separate process. You must ensure that there is only ever one Celery Beat process running at a time to avoid multiple instances of the same task being scheduled.

It's also important to note that you can not run Celery Beat in the same process as a worker that is using the `gevent` pool. 

For more information, see the [Celery Beat documentation](https://docs.celeryq.dev/en/stable/userguide/periodic-tasks.html).
