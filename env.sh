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
  graphql_endpoint="${env_name}_CRDS_GQL_ENDPOINT"
  test_pwd="${env_name}_TEST_SITE_USER_PW"
  test_login_endpoint="${env_name}_TEST_CRDS_LOGIN_ENDPOINT"
  test_generic_user_pw="${env_name}_TEST_GENERIC_USER_PW"
else
  cfl_space_id="CONTENTFUL_SPACE_ID"
  cfl_env="CONTENTFUL_ENV"
  cfl_access_token="CONTENTFUL_ACCESS_TOKEN"
  interactions_endpoint="CRDS_INTERACTIONS_ENDPOINT"
  graphql_endpoint="CRDS_GQL_ENDPOINT"
  test_pwd="TEST_SITE_USER_PW"
  test_login_endpoint="TEST_CRDS_LOGIN_ENDPOINT"
  test_generic_user_pw="TEST_GENERIC_USER_PW"
fi

cat >.env <<EOL
CONTENTFUL_SPACE_ID=${!cfl_space_id}
CONTENTFUL_ENV=${!cfl_env}
CONTENTFUL_ACCESS_TOKEN=${!cfl_access_token}
CRDS_INTERACTIONS_ENDPOINT=${!interactions_endpoint}
CRDS_GQL_ENDPOINT=${!graphql_endpoint}
TEST_SITE_USER_PW=${!test_pwd}
TEST_CRDS_LOGIN_ENDPOINT=${!test_login_endpoint}
TEST_GENERIC_USER_PW=${!test_generic_user_pw}
EOL
