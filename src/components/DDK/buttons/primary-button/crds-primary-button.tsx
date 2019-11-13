import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'crds-primary-button',
  styleUrls: ['crds-primary-button.scss', '../crds-buttons.scss'],
  shadow: true
})
export class CrdsPrimaryButton {
  @Prop() color: string;
  @Prop() onClick: (event: MouseEvent) => void;
  @Prop() text: string;
  @Prop() href: string;

  public renderATagButton() {
    return (
      <a href={this.href} class={`btn-primary btn-${this.color}`}>
        {this.text}
      </a>
    );
  }

  public renderButton() {
    return (
      <button class={`btn btn-primary btn-${this.color}`} onClick={this.onClick}>
        {this.text}
      </button>
    );
  }

  public render() {
    if (this.href) return this.renderATagButton();
    else return this.renderButton();
  }
}
