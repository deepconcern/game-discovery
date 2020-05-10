#!/usr/bin/env sh

set -eux

NODE_ENV=production npx webpack --config webpack.prod.js
