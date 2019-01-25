#!/bin/bash

if [ "$TRAVIS" = "true" ]; then
  if [ "$TRAVIS_BRANCH" = "master" ]; then
    env_name="PROD"
  else
    env_name="INT"
  fi
  cfl_space_id="${env_name}_CONTENTFUL_SPACE_ID"
  cfl_env="${env_name}_CONTENTFUL_ENV"
  cfl_access_token="${env_name}_CONTENTFUL_ACCESS_TOKEN"
  interactions_endpoint="${env_name}_CRDS_INTERACTIONS_ENDPOINT"
else
  cfl_space_id="CONTENTFUL_SPACE_ID"
  cfl_env="CONTENTFUL_ENV"
  cfl_access_token="CONTENTFUL_ACCESS_TOKEN"
  interactions_endpoint="CRDS_INTERACTIONS_ENDPOINT"
fi

cat >.env <<EOL
CONTENTFUL_SPACE_ID=${!cfl_space_id}
CONTENTFUL_ENV=${!cfl_env}
CONTENTFUL_ACCESS_TOKEN=${!cfl_access_token}
CRDS_INTERACTIONS_ENDPOINT=${!interactions_endpoint}
EOL