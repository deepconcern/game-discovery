#!/usr/bin/env sh

set -eux

npx apollo client:codegen src/graphql-operations \
--outputFlat \
--includes=src/**/* \
--excludes=src/graphql-operations/* \
--localSchemaFile=../schema.graphql \
--target=typescript
