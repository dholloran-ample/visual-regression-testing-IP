#!/bin/bash

if ([ "$TRAVIS" = "true" ] && [ "$TRAVIS_BRANCH" = "master" ]); then
  npm publish --dry-run
fi