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
- [main-nav](main-nav)

### Graph
```mermaid
graph TD;
  crds-shared-header --> global-nav
  crds-shared-header --> main-nav
  global-nav --> profile-nav
  global-nav --> give-nav
  main-nav --> nav-section
  main-nav --> nav-section-subnav
  main-nav --> nav-ctas
  style crds-shared-header fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
