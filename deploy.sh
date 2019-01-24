#!/bin/bash

if ([ "$TRAVIS" = "true" ] && [ "$TRAVIS_BRANCH" = "master" ]); then
  if["$SKIP_NPM_DEPLOY" = "true"]; then
    npm publish --dry-run
  else
    npm publish
  fi
fi