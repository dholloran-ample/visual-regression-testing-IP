# snail-trail



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type     | Default     |
| -------- | --------- | ----------- | -------- | ----------- |
| `env`    | `env`     |             | `string` | `'prod'`    |
| `name`   | `name`    |             | `string` | `undefined` |
| `src`    | `src`     |             | `string` | `undefined` |


## Dependencies

### Depends on

- [crds-subscribe](../crds-subscribe)
- [crds-snail-trail-link](crds-snail-trail-link)

### Graph
```mermaid
graph TD;
  crds-snail-trail --> crds-subscribe
  crds-snail-trail --> crds-snail-trail-link
  crds-subscribe --> crds-modal
  style crds-snail-trail fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
