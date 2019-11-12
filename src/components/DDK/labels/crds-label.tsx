import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'crds-label',
  styleUrls: ['crds-label.scss'],
  shadow: true
})
export class CrdsLabel {
  @Prop() tint: string;
  @Prop() text: string;

  public render() {
    return <span class={`label label-${this.tint}`}>{this.text}</span>;
  }
}
