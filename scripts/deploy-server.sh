#!/usr/bin/env sh

set -eux

IMAGE_TAG=game-discovery-graphql

heroku container:login

heroku container:push web

heroku container:release web
