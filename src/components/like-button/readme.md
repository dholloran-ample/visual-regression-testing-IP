# like-button



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                 | Type      | Default        |
| ------------- | -------------- | ----------------------------------------------------------- | --------- | -------------- |
| `id`          | `id`           | Unique identifier for likeable resource                     | `string`  | `undefined`    |
| `isLiked`     | `is-liked`     | Boolean indicating whether likeable resource has been liked | `boolean` | `undefined`    |
| `key`         | `key`          | Cache key for localStorage                                  | `string`  | `"crds-likes"` |
| `likeLabel`   | `like-label`   | Label for "like" state                                      | `string`  | `"Like"`       |
| `unlikeLabel` | `unlike-label` | Label for "unlike" state                                    | `string`  | `"Unlike"`     |


## Events

| Event           | Description                                    | Type                |
| --------------- | ---------------------------------------------- | ------------------- |
| `likeCompleted` | Event emitter for "on complete" of like toggle | `CustomEvent<void>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
