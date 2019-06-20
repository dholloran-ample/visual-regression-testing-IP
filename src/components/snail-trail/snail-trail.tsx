import { Component, Element, Prop, State } from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'snail-trail',
  styleUrl: 'snail-trail.scss',
  shadow: true
})
export class SnailTrail {
  @Prop() src: string;
  @Prop() env: string = 'prod';
  @Prop() name: string;

  @State() data: any = {};

  @Element() element: HTMLElement;

  componentWillLoad() {
    const url = this.src || `https://crds-data.netlify.com/snail-trails/${this.name}/${this.env}.json`;
    axios.get(url).then(response => (this.data = response.data));
  }

  listItem(item) {
    if (!item.href) return <strong>{item.title}</strong>;
    return (
      <snail-trail-link href={item.href} automationId={item['data-automation-id']}>
        {item.title}
      </snail-trail-link>
    );
  }

  list(section) {
    return section.map(item => {
      return <li>{this.listItem(item)}</li>;
    });
  }

  navSections() {
    if (!this.data.nav) return;
    return this.data.nav.map(section => <ul>{this.list(section)}</ul>);
  }

  render() {
    if (!this.data.nav) return;
    return (
      <nav>
        <div>
          {this.element.childElementCount > 0 && <slot />}
          {this.element.childElementCount == 0 && <ul>{this.navSections()}</ul>}
        </div>
      </nav>
    );
  }
}
