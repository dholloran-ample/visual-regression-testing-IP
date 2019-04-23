import { Component, Prop } from "@stencil/core";

@Component({
  tag: "crds-header",
  shadow: true
})
export class Header {
  @Prop() href: string;
  render() {
    return (
      <h2>
        <slot />
      </h2>
    );
  }
}
