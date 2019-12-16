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
  @Prop() icon: string;
  @Prop() iconColor: string;
  @Prop() iconSize: string;
  @Prop() iconAlign: string;

  private getClasses() {
    if (this.display === 'link') return 'btn btn-link' + (this.secondary ? ` secondary` : '');
    return (
      'btn' +
      (this.color ? ` btn-${this.color}` : '') +
      (this.size ? ` btn-${this.size}` : '') +
      (this.iconAlign ? ` icon-align-${this.iconAlign}` : '') +
      (this.display ? ` btn-${this.display}` : '') +
      (this.block ? ` btn-block` : '')
    );
  }

  private renderButton() {
    return (
      <button
        class={this.getClasses()}
        {...(this.disabled !== undefined ? { disabled: true } : '')}
        onClick={this.onClick}
        type="button"
      >
        <span>
          {this.icon && this.iconAlign === 'left' ? this.renderIcon(this.icon, this.iconSize, this.iconColor) : ''}
          {this.text}
          {this.icon && this.iconAlign === 'right' ? this.renderIcon(this.icon, this.iconSize, this.iconColor) : ''}

        </span>
      </button>
    );
  }

  private renderLink() {
    return (
      <a href={this.href} class={this.getClasses()} {...(this.disabled !== undefined ? { disabled: true } : '')}>
        {this.text}
      </a>
    );
  }

  private renderIcon(icon, size, color){
    return <crds-icon name={icon} size={size} color={color}></crds-icon>
  }


  public render() {
    if (this.href) return this.renderLink();
    return this.renderButton();
  }
}
