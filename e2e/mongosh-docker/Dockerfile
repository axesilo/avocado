# Ubuntu image that installs and runs the MongoDB Shell.
# https://www.mongodb.com/docs/mongodb-shell/install/

# Start from Ubuntu 22.04
FROM ubuntu:jammy

RUN apt-get update && apt-get install -y wget gnupg

# Import MongoDB public GPG key
RUN wget -qO- https://www.mongodb.org/static/pgp/server-7.0.asc > /etc/apt/trusted.gpg.d/server-7.0.asc

# Create list file for MongoDB
RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" > /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install the `mongosh` package
RUN apt-get update && apt-get install -y mongodb-mongosh

CMD mongosh "${MONGODB_CONNECTION_STRING:-mongodb://host.docker.internal:27017}"
