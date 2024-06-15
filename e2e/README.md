# E2E Tests for Avocado

This directory contains E2E tests for Avocado, which use the production build of the library to run
against an ephemeral MongoDB database (configured using Docker Compose).

## Rough Notes

- `compose.yaml` is the preferred name and is searched out by default
- `docker compose up` - and Ctrl + C will not delete the containers/data, just stop them
- `mongosh --port 27018` to connect locally
- `build:` to build and use a container (see https://docs.docker.com/compose/compose-file/build/),
  or `image`
- `volumes` to use a persistent volume
- `environment: - DEBUG=1` to set some env vars

- https://docs.docker.com/compose/compose-application-model/
- https://docs.docker.com/compose/gettingstarted/
- https://docs.docker.com/compose/samples-for-compose/
- `mongosh --port 27018 -p e2epassword -u e2euser --authenticationDatabase admin testdb`
- `AVOCADO_MONGODB_CONNECTION_STRING=mongodb://e2euser:e2epassword@localhost:27018/testdb?authSource=admin npm test`

## Running the tests without the Docker container

```
AVOCADO_MONGODB_CONNECTION_STRING=mongodb://e2euser:e2epassword@localhost:27018/testdb?authSource=admin npm test
```

## References

- [`docker compose` CLI reference](\https://docs.docker.com/reference/cli/docker/compose/)
- [Docker Compose specification: Services](https://docs.docker.com/compose/compose-file/05-services/)
- [Compose Build Specification](https://docs.docker.com/compose/compose-file/build/)
