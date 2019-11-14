import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'crds-button',
  styleUrl: 'crds-button.scss',
  shadow: true
})
export class CrdsPrimaryButton {
  @Prop() color: string;
  @Prop() onClick: (event: MouseEvent) => void;
  @Prop() text: string;
  @Prop() href: string;
  @Prop() type: string;
  
  public render() {
    return (
      <button class={`btn btn-${this.type} btn-${this.color}`} onClick={this.onClick}>
        {this.text}
      </button>
    );
  }
}
