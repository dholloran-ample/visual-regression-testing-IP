import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'crds-button',
  styleUrl: 'crds-button.scss',
  shadow: true
})
export class CrdsPrimaryButton {
  @Prop() color: string;
  @Prop() onClick?: (event: MouseEvent) => void;
  @Prop() text: string;
  @Prop() href?: string;
  @Prop() size?: string;
  @Prop() display?: string;
  @Prop() disabled: boolean;
  @Prop() secondary: boolean;
  @Prop() block: boolean;

  private getClasses() {
    if (this.display === 'link') {
      return 'btn btn-link' +
        (this.secondary ? ` secondary` : '')
    } else {
      return 'btn' +
        (this.color ? ` btn-${this.color}` : '') +
        (this.size ? ` btn-${this.size}` : '') +
        (this.display ? ` btn-${this.display}` : '') +
        (this.block ? ` btn-block` : '')
    }
  }

  private renderButton() {
    return (
      <button
        class={this.getClasses()}
        {...(this.disabled !== undefined ? { disabled: true } : '')}
        onClick={this.onClick}
        type="button"
      >
        {this.text}
      </button>
    );
  }

  private renderLink() {
    return (
      <a
        href={this.href}
        class={this.getClasses()}
        {...(this.disabled !== undefined ? { disabled: true } : '')}
      >
        {this.text}
      </a>
    );
  }

  public render() {
    if (this.href) return this.renderLink();
    return this.renderButton();
  }
}
