import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'nav-section-subnav',
  styleUrl: 'nav-section-subnav.scss',
  shadow: false
})
export class NavSectionSubnav {
  @Prop({ mutable: true }) private active: string;
  @Prop() private id: string;

  render() {
    return (
      <div class={this.active == this.id ? '' : ' hidden'}>
        <slot />
      </div>
    );
  }
}
