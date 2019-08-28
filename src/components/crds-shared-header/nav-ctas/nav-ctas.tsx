import { Component, Prop, h } from '@stencil/core';
import decode from 'unescape';

@Component({
  tag: 'nav-ctas',
  styleUrl: 'nav-ctas.scss',
  shadow: true
})
export class NavCtas {
  @Prop() href: string;
  @Prop() isActive: boolean = false;
  @Prop() data: string; //TODO whyyyyyyy?

  decodedData() {
    return decode(this.data || '');
  }

  render() {
    if (this.isActive) return null;
    return <div class="ctas" innerHTML={this.decodedData()} />;
  }
}
