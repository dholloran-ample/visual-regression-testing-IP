![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)
![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Crds-IP/Visual-regression-testing)

# crds-components

This project contains custom web components developed for Crossroads' Church. See [StencilJS](https://stenciljs.com/) for information on the framework.

The following components are made available via this library. Please see the README file for each, for more information on usage, available props, etc.

- [`<crds-heart-button />`](https://github.com/crdschurch/crds-components/tree/master/src/components/crds-heart-button)
- [`<crds-modal />`](https://github.com/crdschurch/crds-components/tree/master/src/components/crds-modal)
- [`<crds-shared-footer />`](https://github.com/crdschurch/crds-components/tree/master/src/components/crds-shared-footer)
- [`<crds-shared-header />`](https://github.com/crdschurch/crds-components/tree/master/src/components/crds-shared-header)
- [`<crds-snail-trail />`](https://github.com/crdschurch/crds-components/tree/master/src/components/crds-snail-trail)
- [`<crds-subscribe />`](https://github.com/crdschurch/crds-components/tree/master/src/components/crds-subscribe)
- [`<crds-site-happenings />`](https://github.com/crdschurch/crds-components/tree/master/src/components/crds-site-happenings)
- [`<life-stages />`](https://github.com/crdschurch/crds-components/tree/master/src/components/life-stages)
- [`<greeting-component />`](https://github.com/crdschurch/crds-components/tree/master/src/components/greeting-component)

## Environments

You need to export the following variables when building or running the project...

| Variable                     | Description                                   |
| ---------------------------- | --------------------------------------------- |
| `CONTENTFUL_ACCESS_TOKEN`    | Access token for the Contentful Delivery API  |
| `CONTENTFUL_SPACE_ID`        | Contentful Space ID                           |
| `CONTENTFUL_ENV`             | Contentful environment (defaults to `master`) |
| `CRDS_INTERACTIONS_ENDPOINT` | Service endpoint                              |
| `CRDS_GQL_ENDPOINT`          | GraphQL endpoint                              |
| `ENV_SUBDOMAIN`              | Subdomain and cookie prefix for mp tokens.    |
| `CRDS_GQL_ENDPOINT`          | GraphQL Gateway Endpoint                      |
| `OKTA_CLIENT_ID`             | Okta client id                                |
| `OKTA_OAUTH_BASE_URL`        | Crds Okta base url                            |
| `CRDS_GATEWAY_SERVER_ENDPOINT`| Crds old gateway URL until we move to okta   |

You need to export the following variables when running tests on the project...

| Variable                     | Description                                   |
| ---------------------------- | --------------------------------------------- |
| `TEST_SITE_USER_PW`          | Test user's password                          |
| `TEST_CRDS_LOGIN_ENDPOINT`   | Gateway login endpoint                        |


## License

This project is licensed under the [3-Clause BSD License](https://opensource.org/licenses/BSD-3-Clause).
