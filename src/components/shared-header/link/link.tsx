import { Component, Prop } from "@stencil/core";

@Component({
  tag: "crds-link",
  styleUrl: "link.scss",
  shadow: true
})
export class Link {
  @Prop() href: string;
  render() {
    return (
      <a href={this.href}>
        <slot />
      </a>
    );
  }
}
