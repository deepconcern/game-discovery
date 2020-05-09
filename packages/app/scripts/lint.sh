#!/usr/bin/env sh

set -eux

eslint . --ext .js,.jsx,.mjs,.ts,.tsx
