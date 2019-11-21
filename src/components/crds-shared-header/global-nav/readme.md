# global-nav



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type     | Default     |
| -------- | --------- | ----------- | -------- | ----------- |
| `data`   | `data`    |             | `any`    | `{}`        |
| `env`    | `env`     |             | `string` | `undefined` |


## Dependencies

### Used by

 - [crds-shared-header](..)

### Depends on

- [my-site](../profile-nav/my-site)
- [give-nav](../profile-nav)
- [profile-nav](../profile-nav)
- [main-nav](../main-nav)

### Graph
```mermaid
graph TD;
  global-nav --> my-site
  global-nav --> give-nav
  global-nav --> profile-nav
  global-nav --> main-nav
  my-site --> crds-image-title-cutout
  main-nav --> nav-section
  main-nav --> nav-ctas
  main-nav --> nav-section-subnav
  crds-shared-header --> global-nav
  style global-nav fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
