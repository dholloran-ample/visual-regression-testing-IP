# shared-header



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type     | Default     |
| -------- | --------- | ----------- | -------- | ----------- |
| `env`    | `env`     |             | `string` | `'prod'`    |
| `src`    | `src`     |             | `string` | `undefined` |


## Dependencies

### Depends on

- [nav-section](nav-section)
- [nav-section-subnav](nav-section-subnav)
- [global-nav](global-nav)
- [nav-ctas](nav-ctas)

### Graph
```mermaid
graph TD;
  shared-header --> nav-section
  shared-header --> nav-section-subnav
  shared-header --> global-nav
  shared-header --> nav-ctas
  global-nav --> profile-nav
  global-nav --> give-nav
  style shared-header fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
