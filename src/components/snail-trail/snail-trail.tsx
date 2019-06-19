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

  @State() data: Array<any> = [];

  @Element() element: HTMLElement;

  componentWillLoad() {
    const url = this.src || `https://crds-data.netlify.com/snail-trails/${this.name}/${this.env}.json`;
    axios.get(url).then(response => (this.data = response.data));
  }

  componentDidRender() {
    this.element.parentElement.classList.add('snail-trail');
    this.element.parentElement.classList.remove('snail-trail-skeleton');
  }

  listItems() {
    return this.data.map(item => {
      if (typeof item === 'string') return <span>{item}</span>;
      let attrs = { href: item.href };
      if (item['automation-id']) attrs['data-automation-id'] = item['automation-id'];
      return (
        <li>
          <a {...attrs}>{item.title}</a>
        </li>
      );
    });
  }

  render() {
    if (this.data.length === 0) return null;
    return (
      <nav>
        <div>
          <ul>{this.listItems()}</ul>
        </div>
      </nav>
    );
  }
}
