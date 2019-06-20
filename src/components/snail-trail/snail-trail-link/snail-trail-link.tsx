import { Component, Element, Prop, State } from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'snail-trail-link',
  styleUrl: 'snail-trail-link.scss',
  shadow: true
})
export class SnailTrailLink {
  @Prop() automationId: string;
  @Prop() href: string = '#';

  render() {
    return (
      <a href={this.href} data-automation-id={this.automationId}>
        <slot />
      </a>
    );
  }
}
