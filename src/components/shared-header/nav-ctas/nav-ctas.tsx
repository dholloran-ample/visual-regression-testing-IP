import { Component, Prop } from '@stencil/core';
import decode from 'unescape';

@Component({
  tag: 'nav-ctas',
  styleUrl: 'nav-ctas.scss',
  shadow: true
})
export class NavCtas {
  @Prop() href: string;
  @Prop() active: string;
  @Prop() data: string;

  decodedData() {
    return decode(this.data || '');
  }

  render() {
    if (this.active) return null;
    return <div class="ctas" innerHTML={this.decodedData()} />;
  }
}
