Using Digital Ocean Spaces for Django Media (in addition to AWS services)
=========================================================================

__*The following guide was contributed by Neil Bartlett and Finbar, members of the Pegasus community.
Any questions or issues using it should be directed to the #deployment channel of the community Slack.*__

This guide documents how to use a different media storage (in this case, Digital Ocean Spaces),
while still using some Amazon services (in this case, SES for email), deployed to Digital Ocean App Platform.

The main issue/insight is that `django-storages` allows for [different settings/environment variables](https://django-storages.readthedocs.io/en/latest/backends/amazon-S3.html#authentication-settings),
e.g. `AWS_S3_ACCESS_KEY_ID` vs `AWS_ACCESS_KEY_ID` or `AWS_S3_SECRET_ACCESS_KEY` vs `AWS_SECRET_ACCESS_KEY`.

This means you can use a different AWS key for S3, SES, or any other service.

Many of the steps would be the same when deploying to other platforms, but some of the details around where to put
variables or access a shell/console would be different.

Here's a detailed walkthrough:
 
[This post](https://testdriven.io/blog/django-digitalocean-spaces/) is useful but contains a lot of errors.
So read it to get an idea of the process, but don't follow it exactly.

First [use `s3cmd`](https://docs.digitalocean.com/products/spaces/reference/s3cmd-usage/) to make sure that Spaces is correctly setup.

Once you can see your buckets from `s3cmd`, then you have correctly set up the space and the access keys.
BUT note to do the above you need an access key with All Permissions set.
This is probably overkill for the access key for running the app — but was needed to configure `s3cmd`.

Next, setup all the following in the `app-spec.yaml`. This feels like over spec’ing but I found all settings are necessary.
Replace REPLACEME-XXXXXXX, the -aws-region, the-digital-ocean-region, my-bucket-name  with your settings.
Note AWS_S3_ENDPOINT_URL could be written using `app-spec.yaml` reference syntax but I wanted to be sure so it is explicit.

```yaml
  - key: AWS_DEFAULT_REGION
    scope: RUN_TIME
    value: the-aws-region
  - key: AWS_ACCESS_KEY_ID
    scope: RUN_TIME
    value: REPLACEME-XXXXXXXX
  - key: AWS_SECRET_ACCESS_KEY
    scope: RUN_TIME
    value: REPLACEME-XXXXXXXX
  - key: SERVER_EMAIL
    scope: RUN_TIME
    value: noreply@example.com
  - key: DEFAULT_FROM_EMAIL
    scope: RUN_TIME
    value: info@example.com
  - key: EMAIL_BACKEND
    scope: RUN_TIME
    value: anymail.backends.amazon_ses.EmailBackend
  - key: AWS_S3_REGION_NAME
    scope: RUN_TIME
    value: the-digital-ocean-region
  - key: AWS_S3_ACCESS_KEY_ID
    scope: RUN_TIME
    value: REPLACEME-XXXXXXXX
  - key: AWS_S3_SECRET_ACCESS_KEY
    scope: RUN_TIME
    value: REPLACEME-XXXXXXXX
  - key: AWS_STORAGE_BUCKET_NAME
    scope: RUN_TIME
    value: my-bucket-name
  - key: AWS_S3_ENDPOINT_URL
    scope: RUN_TIME
    value: https://the-digital-ocean-region.digitaloceanspaces.com
  - key: USE_S3_MEDIA
    scope: RUN_TIME
    value: "true"
  - key: PUBLIC_MEDIA_LOCATION
    scope: RUN_TIME
    value: media
  - key: MEDIA_URL
    scope: RUN_TIME
    value: https://my-bucket-name.the-digital-ocean-region.digitaloceanspaces.com/media
```

This will redeploy the app.

Then, in the digital ocean app platform console run:

```
env | grep AWS
```

This should give the same settings as in the app-spec.

The pure settings alone did not work: I had to remove the `USE_S3_MEDIA` code from `settings.py` and
in `setting_production.py` add the equivalent but using the S3 variants of the environment variables.
I could have just edited the stuff in `settings.py`. 
Part of the issue is that the precedence in the `django-storages` has internal variables take precedence over env variables,
so if there are internal variables being used they will override the `app-spec.yaml` settings.
Also note that `AWS_S3_ADDRESSING_STYLE` is probably important to override.
I could not get it to work without being explicit about this. I prob should have added this to `app-spec.yaml`.

```python
USE_S3_MEDIA = env.bool("USE_S3_MEDIA", default=False)
if USE_S3_MEDIA:

    # We are assuming the app-spec.yaml or the .env file has set the production values
    # But seems we need to pull in some here

    # Media file storage in S3
    # Using this will require configuration of the S3 bucket

    AWS_STORAGE_BUCKET_NAME = env("AWS_STORAGE_BUCKET_NAME")
    AWS_S3_ENDPOINT_URL = env("AWS_S3_ENDPOINT_URL")
    AWS_S3_REGION_NAME = env("AWS_S3_REGION_NAME")
    AWS_S3_ADDRESSING_STYLE = env("AWS_S3_ADDRESSING_STYLE", default="path")
    AWS_S3_USE_SSL=True
    PUBLIC_MEDIA_LOCATION = "media"

    STORAGES["default"] = {
        "BACKEND": "apps.web.storage_backends.PublicMediaStorage",
    }
```

Run the shell from the Digital Ocean console.
Run `python3 manage.py shell` and import the settings and make sure there not any settings that are taking prceedence
over the `app-spec.yaml` that you are not expecting:

```python
from <myapp>.settings import *
print(AWS_ACCESS_KEY_ID)
print(AWS_S3_ACCESS_KEY_ID)
print(AWS_SECRET_ACCESS_KEY)
print(AWS_S3_SECRET_ACCESS_KEY)
print(AWS_DEFAULT_REGION)
print(AWS_S3_REGION)
```

This is just the "starter" list. If things are not working add more from the `app-spec.yaml` list.
Run a test directly from the django shell:

```python
from storages.backends.s3boto3 import S3Boto3Storage
from io import BytesIO
import logging

logging.basicConfig(level=logging.DEBUG)
logging.getLogger('botocore').setLevel(logging.DEBUG)

storage = S3Boto3Storage()
print("Bucket:", storage.bucket)
print("Endpoint:", storage.connection)

test_file = BytesIO(b"Hello, DigitalOcean!")
test_file_name = "test_upload.txt"

storage.save(test_file_name, test_file)
```

If this works then things are set up.

**Targetted debugging**

In the django shell. You can use with to target override the default settings. This is very handy to pin things down.

```python
from django.test.utils import override_settings
from io import BytesIO

with override_settings(
    AWS_STORAGE_BUCKET_NAME='penalty-mentor-spaces',
    AWS_S3_ENDPOINT_URL='https://tor1.digitaloceanspaces.com',
    AWS_S3_REGION_NAME='tor1',
    AWS_S3_ADDRESSING_STYLE='path',
    AWS_DEFAULT_ACL='public-read',
    AWS_S3_USE_SSL=True,
):
    from storages.backends.s3boto3 import S3Boto3Storage
    storage = S3Boto3Storage()
    print("Bucket Name:", storage.bucket)
    print("Endpoint URL:", storage.connection)
    test_file = BytesIO(b"Hello, DigitalOcean!")
    test_file_name = "test_upload.txt"
    storage.save(test_file_name, test_file)
Finally use the actual class that Pegasus is using
from apps.web.storage_backends import PublicMediaStorage
storage = PublicMediaStorage()
print("Bucket Name:", storage.bucket)
print("Endpoint URL:", storage.connection)
test_file = BytesIO(b"Hello, DigitalOcean!")
test_file_name = "test_upload.txt"
storage.save(test_file_name, test_file)
Note also for debugging useful to set
import logging

logging.basicConfig(level=logging.DEBUG)
logging.getLogger('botocore').setLevel(logging.DEBUG)
```

either in `settings_production.py` or the django shell.
