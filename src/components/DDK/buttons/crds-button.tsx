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
  @Prop() type?: string;
  @Prop() size?: string;
  @Prop() display?: string;
  @Prop() value?: string;
  @Prop() disabled: boolean;
  @Prop() secondary: boolean;

  private renderButton() {
    return (
      <button
        class={
          'btn' +
          (this.color ? ` btn-${this.color}` : '') +
          (this.type ? ` btn-${this.type}` : '') +
          (this.size ? ` btn-${this.size}` : '') +
          (this.display ? ` btn-${this.display}` : '') +
          (this.secondary ? ` secondary` : '')
        }
        {...(this.disabled !== undefined ? { disabled: true } : '')}
        onClick={this.onClick}
        type="button"
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
        type={this.type == 'submit' ? 'submit' : 'button'}
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
        role="button"
      >
        {this.text}
      </a>
    );
  }

  public render() {
    if (this.type == 'input' || this.type == 'submit') return this.renderInput();
    if (this.type == 'link') return this.renderLink();
    return this.renderButton();
  }
}
