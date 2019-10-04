# shared-header



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type     | Default     |
| -------- | --------- | ----------- | -------- | ----------- |
| `env`    | `env`     |             | `string` | `'prod'`    |
| `src`    | `src`     |             | `string` | `undefined` |


## Dependencies

### Depends on

- [global-nav](global-nav)

### Graph
```mermaid
graph TD;
  crds-shared-header --> global-nav
  global-nav --> give-nav
  global-nav --> profile-nav
  global-nav --> main-nav
  main-nav --> nav-section
  main-nav --> nav-ctas
  main-nav --> nav-section-subnav
  style crds-shared-header fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
