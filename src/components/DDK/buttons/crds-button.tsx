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
  @Prop() size: string;
  @Prop() display: string;
  @Prop() value: string;
  @Prop() disabled;

  private renderButton() {
    return (
      <button
        class={
          `btn btn-${this.type} btn-${this.color}` +
          (this.size ? ` btn-${this.size}` : '') +
          (this.display ? ` btn-${this.display}` : '')
        }
        {...(this.disabled !== undefined ? { disabled: true } : '')}
        onClick={this.onClick}
      >
        {this.text}
      </button>
    );
  }

  private renderInput() {
    return (
      <input
        class={
          `btn btn-${this.type} btn-${this.color}` +
          (this.size ? ` btn-${this.size}` : '') +
          (this.display ? ` btn-${this.display}` : '')
        }
        {...(this.disabled !== undefined ? { disabled: true } : '')}
        onClick={this.onClick}
        value={this.value}
      >
        {this.text}
      </input>
    );
  }

  private renderLink() {
    return (
      <a
        href={this.href}
        class={`btn btn-${this.type} btn-${this.color}` + (this.size ? ` btn-${this.size}` : '')}
        {...(this.disabled !== undefined ? { disabled: true } : '')}
      >
        {this.text}
      </a>
    );
  }

  public render() {
    if (this.href) return this.renderLink();
    if (this.value) return this.renderInput();
    return this.renderButton();
  }
}
