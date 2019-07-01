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
- [snail-trail-link](snail-trail-link)

### Graph
```mermaid
graph TD;
  snail-trail --> crds-subscribe
  snail-trail --> snail-trail-link
  crds-subscribe --> crds-modal
  style snail-trail fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
