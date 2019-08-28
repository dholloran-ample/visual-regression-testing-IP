import { Component, Prop, h } from '@stencil/core';
import decode from 'unescape';

@Component({
  tag: 'nav-ctas',
  styleUrl: 'nav-ctas.scss',
  shadow: true
})
export class NavCtas {
  @Prop() data: string;

  decodedData() {
    return decode(this.data || '');
  }

  render() {
    return <div class="ctas" innerHTML={this.decodedData()} />;
  }
}
