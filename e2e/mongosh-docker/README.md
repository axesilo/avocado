# `mongosh` Docker Image

This directory contains a simple Linux Docker image that runs `mongosh` for use in E2E test
pipelines and other environments where `mongosh` isn't pre-installed and/or it's not desirable to
install it locally on the host.

## Building the image

Run `docker build -t mongosh .` from this directory to build the image.

## Running the image

```sh
docker run -it -e MONGODB_CONNECTION_STRING="mongodb://myuser:mypassword@host.docker.internal:27017/" mongosh
```

If the `MONGODB_CONNECTION_STRING` is omitted, the container will default to trying to connect to
`host.docker.internal:27017`.

Note that `host.docker.internal` is how Docker containers connect to the outside host in Docker
Desktop (Windows/macOS). On Linux hosts you may instead want to add the flag `--network="host"` to
the `docker run` command and use `127.0.0.1` as the MongoDB host.

## Notes

Right now the image is based on Ubuntu 22.04 (Jammy), but that might change in the future if a
smaller image size seems possible.
