import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'crds-button',
  styleUrl: 'crds-button.scss',
  shadow: true
})
export class CrdsButton {
  @Prop() href: string;
  @Prop() label: string;

  render() {
    return (
      <a class="card-button" href={this.href}>
        {this.label}
      </a>
    );
  }
}
